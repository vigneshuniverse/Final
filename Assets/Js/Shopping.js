/* Shopping Page – Loads Products From Google Apps Script */
(function(){
  'use strict';
  var grid=document.getElementById('productsGrid');
  var filtersEl=document.getElementById('shopFilters');
  var emptyEl=document.getElementById('shopEmpty');
  var loadingEl=document.getElementById('shopLoading');
  var currentFilter='all';
  var products=[];
  var categories=[];

  function getScriptUrl(){
    return window.APPS_SCRIPT_URL||'';
  }

  function showLoading(show){
    if(loadingEl)loadingEl.style.display=show?'block':'none';
  }

  function renderFilters(){
    if(!filtersEl)return;
    var html='<button class="shop-filter-btn active" data-cat="all">All</button>';
    categories.forEach(function(c){
      if(c.active!==false)html+='<button class="shop-filter-btn" data-cat="'+c.id+'">'+escapeHtml(c.name)+'</button>';
    });
    filtersEl.innerHTML=html;
    filtersEl.querySelectorAll('.shop-filter-btn').forEach(function(btn){
      btn.addEventListener('click',function(){
        filtersEl.querySelectorAll('.shop-filter-btn').forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        currentFilter=btn.getAttribute('data-cat');
        renderProducts();
      });
    });
  }

  function escapeHtml(s){
    var d=document.createElement('div');
    d.textContent=s||'';
    return d.innerHTML;
  }

  function renderProducts(){
    if(!grid)return;
    var list=products.filter(function(p){
      if(p.active===false)return false;
      if(currentFilter==='all')return true;
      return String(p.categoryId)===String(currentFilter);
    });
    if(list.length===0){
      grid.innerHTML='';
      if(emptyEl)emptyEl.style.display='block';
      return;
    }
    if(emptyEl)emptyEl.style.display='none';
    var html='';
    list.forEach(function(p){
      var catName='';
      categories.forEach(function(c){if(String(c.id)===String(p.categoryId))catName=c.name;});
      var price=p.price?('₹ '+Number(p.price).toLocaleString('en-IN')):'';
      var img=p.imageUrl||'';
      var waText=encodeURIComponent('Hello! I Am Interested In The Product: '+p.name+(price?' ('+price+')':''));
      html+='<article class="product-card">';
      html+='<div class="product-img-wrap">'+(img?'<img src="'+escapeHtml(img)+'" alt="'+escapeHtml(p.name)+'" loading="lazy" width="400" height="400">':'')+'</div>';
      html+='<div class="product-body">';
      if(catName)html+='<div class="product-cat">'+escapeHtml(catName)+'</div>';
      html+='<h3 class="product-name">'+escapeHtml(p.name)+'</h3>';
      if(p.description){
        var desc = escapeHtml(p.description).replace(/\n/g, '<br>');
        html+='<p class="product-desc">'+desc+'</p>';
      }
      if(price)html+='<div class="product-price">'+price+'</div>';
      html+='<div class="product-actions"><a class="btn btn-success btn-sm" href="https://wa.me/917448357381?text='+waText+'" target="_blank" rel="noopener">WhatsApp Order</a></div>';
      html+='</div></article>';
    });
    grid.innerHTML=html;
  }

  function loadData(){
    var url=getScriptUrl();
    if(!url||url.indexOf('YOUR_')!==-1){
      showLoading(false);
      if(emptyEl){
        emptyEl.style.display='block';
        emptyEl.innerHTML='<p><strong>Shopping Is Ready.</strong><br>Configure Google Apps Script URL In <code>Assets/Js/Config.js</code> And Add Products From Admin Panel.</p>';
      }
      return;
    }
    showLoading(true);
    fetch(url+'?action=getProducts')
      .then(function(r){return r.json();})
      .then(function(data){
        products=data.products||[];
        categories=data.categories||[];
        renderFilters();
        renderProducts();
      })
      .catch(function(){
        if(emptyEl){
          emptyEl.style.display='block';
          emptyEl.innerHTML='<p>Unable To Load Products. Please Try Again Later.</p>';
        }
      })
      .finally(function(){showLoading(false);});
  }

  loadData();
})();
