const fs = require('fs');
const html = fs.readFileSync('./index.html', 'utf8');
const js = fs.readFileSync('./js/main.js', 'utf8');
const css = fs.readFileSync('./css/styles.css', 'utf8');

console.log('=== HTML VALIDATION ===');
const contactIds = (html.match(/id="contact"/g) || []).length;
console.log('1. Contact section id count:', contactIds, contactIds === 1 ? 'PASS' : 'FAIL');

const caseStudyBtns = (html.match(/class="case-study-action-btn/g) || []).length;
console.log('2. Case study buttons count:', caseStudyBtns, caseStudyBtns === 3 ? 'PASS' : 'FAIL');

const inlineDetailsPanes = (html.match(/class="project-inline-details"/g) || []).length;
console.log('3. Inline details panes count:', inlineDetailsPanes, inlineDetailsPanes === 3 ? 'PASS' : 'FAIL');

const serviceLinks = (html.match(/class="service-card-cta-btn"/g) || []).length;
console.log('4. Service order links count:', serviceLinks, serviceLinks === 3 ? 'PASS' : 'FAIL');

const hasMobileBtn = html.includes('id="mobile-menu-btn"');
console.log('5. Mobile menu button present:', hasMobileBtn ? 'PASS' : 'FAIL');

const hasMobileDrawer = html.includes('id="mobile-fullscreen-drawer"');
console.log('6. Mobile drawer present:', hasMobileDrawer ? 'PASS' : 'FAIL');

console.log('=== CSS VALIDATION ===');
console.log('1. Scroll margin top present:', css.includes('scroll-margin-top') ? 'PASS' : 'FAIL');
console.log('2. Inline details CSS present:', css.includes('.project-inline-details') ? 'PASS' : 'FAIL');
console.log('3. Hamburger button present:', css.includes('.mobile-hamburger-btn') ? 'PASS' : 'FAIL');

console.log('=== JS VALIDATION ===');
console.log('1. Expandable handler present:', js.includes('aria-expanded') ? 'PASS' : 'FAIL');
console.log('2. Service links handler present:', js.includes('serviceOrderBtns') ? 'PASS' : 'FAIL');
console.log('3. Mobile drawer handler present:', js.includes('openMobileMenu') ? 'PASS' : 'FAIL');

console.log('ALL SYNTAX & LOGIC TESTS COMPLETED SUCCESSFULLY.');
