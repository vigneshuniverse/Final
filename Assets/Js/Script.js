/* Vignesh Universe - Minimal JS */
(function(){
  'use strict';
  var nav=document.querySelector('.navbar');
  var menu=document.getElementById('navMenu');
  var toggle=document.getElementById('navToggle');
  var topBtn=document.getElementById('topBtn');

  if(toggle&&menu){
    toggle.addEventListener('click',function(){
      var open=menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  function onScroll(){
    if(nav)nav.classList.toggle('scrolled',window.scrollY>40);
    if(topBtn)topBtn.style.display=window.scrollY>300?'block':'none';
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  if(topBtn){
    topBtn.addEventListener('click',function(){
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=this.getAttribute('href');
      if(id==='#')return;
      var t=document.querySelector(id);
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });

  document.querySelectorAll('.faq-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var expanded=this.getAttribute('aria-expanded')==='true';
      var panel=document.getElementById(this.getAttribute('aria-controls'));
      document.querySelectorAll('.faq-btn').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        var p=document.getElementById(b.getAttribute('aria-controls'));
        if(p)p.classList.remove('open');
      });
      if(!expanded&&panel){
        this.setAttribute('aria-expanded','true');
        panel.classList.add('open');
      }
    });
  });

  // Contact Form → Google Apps Script (With Phone + Business Routing)
  var form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var status=document.getElementById('formStatus');
      var btn=form.querySelector('button[type="submit"]');
      var scriptUrl=window.APPS_SCRIPT_URL||'';
      if(!scriptUrl||scriptUrl.indexOf('YOUR_')!==-1){
        if(status){status.textContent='Please Configure Google Apps Script URL First (See README).';status.className='form-status error';}
        return;
      }
      btn.disabled=true;
      btn.textContent='Sending...';
      if(status){status.textContent='';status.className='form-status';}

      var phoneEl=document.getElementById('phone');
      var data={
        action:'contact',
        name:document.getElementById('name').value.trim(),
        email:document.getElementById('email').value.trim(),
        phone:phoneEl?phoneEl.value.trim():'',
        business:document.getElementById('business').value,
        message:document.getElementById('message').value.trim()
      };

      fetch(scriptUrl,{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'text/plain'},
        body:JSON.stringify(data)
      }).then(function(){
        if(status){status.textContent='Thank You! Your Message Has Been Received.';status.className='form-status success';}
        form.reset();
      }).catch(function(){
        if(status){status.textContent='Something Went Wrong. Please Try WhatsApp.';status.className='form-status error';}
      }).finally(function(){
        btn.disabled=false;
        btn.textContent='Send Message';
      });
    });
  }

  // Admin Link From Config
  var adminLink=document.getElementById('adminLoginLink');
  if(adminLink&&window.ADMIN_PANEL_URL){
    adminLink.href=window.ADMIN_PANEL_URL;
  }

  var yearEl=document.getElementById('year');
  if(yearEl)yearEl.textContent=new Date().getFullYear();

  // Unique Visitor Counter – Today / Weekly / Monthly / Yearly
  // Uses A Persistent Browser ID (LocalStorage) So The Same Visitor
  // Is Counted Only Once Per Day. (True Client IP Is Not Available In Apps Script.)
  (function loadVisitors(){
    var scriptUrl = window.APPS_SCRIPT_URL || '';
    if(!scriptUrl || scriptUrl.indexOf('YOUR_') !== -1) return;

    // Generate or reuse a stable visitor ID (acts like a cookie-based unique ID)
    var STORAGE_KEY = 'vu_visitor_id';
    var vid = '';
    try {
      vid = localStorage.getItem(STORAGE_KEY) || '';
      if(!vid){
        vid = 'v_' + ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c){
          return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
        });
        localStorage.setItem(STORAGE_KEY, vid);
      }
    } catch(e){
      // localStorage blocked – still send a random id for this session
      vid = 't_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    }

    var elToday = document.getElementById('visit-today');
    var elWeek = document.getElementById('visit-weekly');
    var elMonth = document.getElementById('visit-monthly');
    var elYear = document.getElementById('visit-yearly');

    fetch(scriptUrl + '?action=visit&vid=' + encodeURIComponent(vid))
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(!data || !data.success) return;
        function fmt(n){ return (Number(n)||0).toLocaleString('en-IN'); }
        if(elToday) elToday.textContent = fmt(data.today);
        if(elWeek) elWeek.textContent = fmt(data.weekly);
        if(elMonth) elMonth.textContent = fmt(data.monthly);
        if(elYear) elYear.textContent = fmt(data.yearly);
      })
      .catch(function(){});
  })();
})();
