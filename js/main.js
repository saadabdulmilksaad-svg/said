/**
 * ============================================================================
 * موقع عبدالملك سعد الشخصي | المحرك التفاعلي والحركي (Interaction & Motion)
 * ============================================================================
 * كود نقي خفيف وسريع، متوافق بالكامل مع الوصول وجميع الأجهزة.
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var config = window.SITE_CONFIG || {};

  // =========================================================================
  // 1. شريط تقدم التمرير وتحديث رأس الصفحة وتتبع الأقسام (Scroll Tracking)
  // =========================================================================
  var siteHeader = document.getElementById('site-header');
  var scrollProgressBar = document.getElementById('scroll-progress-bar');
  var backToTopBtn = document.getElementById('back-to-top');
  var navLinks = document.querySelectorAll('.nav-item-link, .mobile-nav-link-item');
  var sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    var docEl = document.documentElement;
    var docBody = document.body;
    var winScroll = (docBody ? docBody.scrollTop : 0) || (docEl ? docEl.scrollTop : 0) || window.pageYOffset || 0;
    var height = docEl ? (docEl.scrollHeight - docEl.clientHeight) : 0;
    var scrolledPercent = height > 0 ? (winScroll / height) * 100 : 0;

    if (scrollProgressBar && scrollProgressBar.style) {
      scrollProgressBar.style.width = scrolledPercent + '%';
    }

    if (siteHeader) {
      if (winScroll > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    var scrollPos = winScroll + 200;
    var activeId = '';
    sections.forEach(function(section) {
      var top = section.offsetTop;
      var h = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + h) {
        activeId = section.getAttribute('id');
      }
    });

    if (activeId) {
      navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === '#' + activeId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 2. قائمة الجوال الشاملة (Full-Screen Mobile Drawer)
  // =========================================================================
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  var mobileDrawer = document.getElementById('mobile-fullscreen-drawer');
  var mobileNavLinks = document.querySelectorAll('.mobile-nav-link-item');

  function openMobileMenu(e) {
    if (e) e.preventDefault();
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    if (document.body && document.body.style) document.body.style.overflow = 'hidden';
    if (mobileMenuCloseBtn) {
      setTimeout(function() { mobileMenuCloseBtn.focus(); }, 100);
    }
  }

  function closeMobileMenu(e) {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.focus();
    }
    if (document.body && document.body.style) document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      closeMobileMenu();
      var targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        var targetSection = document.querySelector(targetHref);
        if (targetSection) {
          e.preventDefault();
          setTimeout(function() {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    });
  });

  // =========================================================================
  // 3. توسيع تفاصيل دراسة المشروع المضمنة (Expandable Inline Details)
  // =========================================================================
  var caseStudyBtns = document.querySelectorAll('.case-study-action-btn');
  caseStudyBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (e) e.preventDefault();
      var controlsId = btn.getAttribute('aria-controls');
      var detailsPane = controlsId ? document.getElementById(controlsId) : null;
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      var btnText = btn.querySelector('.btn-text');

      if (detailsPane) {
        if (isExpanded) {
          // إغلاق التفاصيل
          detailsPane.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
          if (btnText) btnText.textContent = 'عرض تفاصيل دراسة المشروع';
        } else {
          // فتح التفاصيل
          detailsPane.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
          if (btnText) btnText.textContent = 'إخفاء تفاصيل المشروع';
        }
      }
    });
  });

  // =========================================================================
  // 4. ربط أزرار طلب الخدمات في Bento Grid وضبط الانتقال وتحديد الخدمة
  // =========================================================================
  var serviceOrderBtns = document.querySelectorAll('.service-card-cta-btn');
  serviceOrderBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      // إغلاق القائمة الجوال إذا كانت مفتوحة لضمان تحرير التمرير
      closeMobileMenu();

      var sName = btn.getAttribute('data-service-name');
      var serviceSelect = document.getElementById('contact-service');
      if (serviceSelect && sName) {
        for (var i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.indexOf(sName) !== -1 || sName.indexOf(serviceSelect.options[i].text) !== -1 || serviceSelect.options[i].value.indexOf(sName) !== -1) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      var contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        var nameInput = document.getElementById('contact-name');
        if (nameInput) {
          setTimeout(function() { 
            nameInput.focus();
          }, 350);
        }
      }
    });
  });

  // مفتاح Escape لإغلاق النوافذ والقوائم
  document.addEventListener('keydown', function(e) {
    if (e && (e.key === 'Escape' || e.keyCode === 27)) {
      closeMobileMenu();
      closeProjectModal();
    }
  });

  // =========================================================================
  // 4. التحقق من نموذج التواصل والإرسال المنظم عبر واتساب (WhatsApp Composer)
  // =========================================================================
  var contactForm = document.getElementById('contact-form');

  function validateForm() {
    var isValid = true;
    var nameInp = document.getElementById('contact-name');
    var serviceInp = document.getElementById('contact-service');
    var messageInp = document.getElementById('contact-message');

    function check(el, isErr, errId) {
      var errEl = document.getElementById(errId);
      if (isErr) {
        if (el) el.classList.add('error');
        if (errEl) errEl.classList.add('visible');
        isValid = false;
      } else {
        if (el) el.classList.remove('error');
        if (errEl) errEl.classList.remove('visible');
      }
    }

    check(nameInp, !nameInp || nameInp.value.trim().length < 3, 'err-contact-name');
    check(serviceInp, !serviceInp || !serviceInp.value, 'err-contact-service');
    check(messageInp, !messageInp || messageInp.value.trim().length < 6, 'err-contact-message');

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!validateForm()) return;

      var name = document.getElementById('contact-name').value.trim();
      var service = document.getElementById('contact-service').value;
      var budget = document.getElementById('contact-budget') ? document.getElementById('contact-budget').value.trim() : '';
      var message = document.getElementById('contact-message').value.trim();

      var formattedMsg = 'مرحباً أ. عبدالملك سعد،\n' +
        'الاسم: ' + name + '\n' +
        'نوع المشروع / الخدمة: ' + service + '\n' +
        (budget ? ('الميزانية المقترحة: ' + budget + '\n') : '') +
        'تفاصيل المشروع: ' + message;

      var code = (config.contact && config.contact.whatsappCountryCode) ? config.contact.whatsappCountryCode : '967';
      var num = (config.contact && config.contact.whatsapp) ? config.contact.whatsapp : '779830449';
      var waUrl = 'https://wa.me/' + code + num + '?text=' + encodeURIComponent(formattedMsg);

      window.open(waUrl, '_blank');
      showToast('جاري فتح محادثة واتساب مع تفاصيل رسالتك...');
    });
  }

  // =========================================================================
  // 5. أدوات النسخ والإشعار الفوري (Copy & Toast)
  // =========================================================================
  var copyBtns = document.querySelectorAll('.btn-mini-copy');
  copyBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var text = btn.getAttribute('data-copy-text');
      var label = btn.getAttribute('data-copy-label') || 'النص';
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast('تم نسخ ' + label + ' بنجاح!');
        }).catch(function() {
          showToast('القيمة: ' + text);
        });
      } else {
        showToast('القيمة: ' + text);
      }
    });
  });

  window.showToast = function(msg) {
    var toast = document.getElementById('toast-msg-box');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg-box';
      toast.className = 'toast-msg-box';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('active');

    setTimeout(function() {
      toast.classList.remove('active');
    }, 3500);
  };

  // تعيين السنة الحالية ديناميكياً
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
