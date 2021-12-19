
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  
  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


$('#foo-p').on('click', function(e) {
  if( $(e.target).is('#rs-phys')  ) {
      e.preventDefault();
  }
});
$('#foo-c').on('click', function(e) {
  if( $(e.target).is('#rs-chem')  ) {
      e.preventDefault();
  }
});
$('#foo-m').on('click', function(e) {
  if( $(e.target).is('#rs-math')  ) {
      e.preventDefault();
  }
});
$('#foo-e').on('click', function(e) {
  if( $(e.target).is('#rs-eng')  ) {
      e.preventDefault();
  }
});
$('#foo-h').on('click', function(e) {
  if( $(e.target).is('#rs-hist')  ) {
      e.preventDefault();
  }
});
function rs(rsid) {

  var node = document.createElement("span");   
  var textnode = document.createTextNode("0%"); 
  node.appendChild(textnode); 
  

  if(rsid==="rs-phys"){var rsid2 = document.getElementById("phys");
    rsid2.classList="";
    rsid2.classList.add("progress-circle","p0");
    rsid2.innerHTML="";
    rsid2.appendChild(node);
  }
  if(rsid==="rs-chem"){var rsid2 = document.getElementById("chem");
    rsid2.classList="";
    rsid2.classList.add("progress-circle","p0");
        rsid2.innerHTML="";
    rsid2.appendChild(node);
  }
  if(rsid==="rs-math"){var rsid2 = document.getElementById("math");
    rsid2.classList="";
    rsid2.classList.add("progress-circle","p0");
        rsid2.innerHTML="";
    rsid2.appendChild(node);
  }
  if(rsid==="rs-eng"){var rsid2 = document.getElementById("eng");
    rsid2.classList="";
    rsid2.classList.add("progress-circle","p0");
        rsid2.innerHTML="";
    rsid2.appendChild(node);
  }
  if(rsid==="rs-hist"){var rsid2 = document.getElementById("hist");
    rsid2.classList="";
    rsid2.classList.add("progress-circle","p0");
    rsid2.innerHTML="";
    rsid2.appendChild(node);
  }


  if(rsid==="rs-all"){
    document.getElementById("sindex").style="0%";
    document.getElementById("sindex").classList="";
    document.getElementById("sindex").classList.add("progress-bar", "bg-danger", "progress-bar-striped", "progress-bar-animated");
    document.getElementById("leandex").style="0%"
        document.getElementById("leandex").classList="";
    document.getElementById("leandex").classList.add("progress-bar", "bg-danger", "progress-bar-striped", "progress-bar-animated");
    document.getElementById("achdex").style="0%"
        document.getElementById("achdex").classList="";
    document.getElementById("achdex").classList.add("progress-bar", "bg-danger", "progress-bar-striped", "progress-bar-animated");
    document.getElementById("opdex").style="0%"
        document.getElementById("opdex").classList="";
    document.getElementById("opdex").classList.add("progress-bar", "bg-danger", "progress-bar-striped", "progress-bar-animated");


    document.getElementById("card-sindex").classList="";
    document.getElementById("card-sindex").classList.add("card", "h-100", "bg-light", "border-danger");
    document.getElementById("card-leandex").classList="";
    document.getElementById("card-leandex").classList.add("card", "h-100", "bg-light", "border-danger");
    document.getElementById("card-achdex").classList="";
    document.getElementById("card-achdex").classList.add("card", "h-100", "bg-light", "border-danger");
    document.getElementById("card-opdex").classList="";
    document.getElementById("card-opdex").classList.add("card", "bg-light", "border-danger");

    let arr=["rs-phys","rs-chem","rs-math","rs-eng","rs-hist"];
    
    for (let i = 0; i < arr.length; i++) {
      rs(arr[i]);
    }
  }

}
