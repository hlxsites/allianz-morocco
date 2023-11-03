import { readBlockConfig, decorateIcons } from '../../scripts/aem.js';

function createSocialWrapper(className) {
  const socialWrapper = document.createElement('div');
  socialWrapper.className = 'c-social-divider-wrapper';
  const hr = document.createElement('hr');
  hr.className = className;
  socialWrapper.appendChild(hr);
  return socialWrapper;
}

function createSocialIconWrapper() {
  const socialIconWrapper = document.createElement('div');
  socialIconWrapper.className = 'c-social-divider-icon-wrapper';
  const socialIconContainer = document.createElement('div');
  socialIconContainer.className = 'c-social-divider-icon-container';
  socialIconWrapper.appendChild(socialIconContainer);
  return socialIconWrapper;
}

function buildSocialMediaDivider(block) {
  const iconsMap = {
    facebook: 'c-icon c-icon-facebook',
    linkedin: 'c-icon c-icon-linked-in',
    twitter: 'c-icon c-icon-twitter',
  };

  const socialDiv = document.createElement('div');
  socialDiv.className = 'c-social-divider';

  const socialWrapperBefore = createSocialWrapper('c-divider');
  const socialWrapperAfter = createSocialWrapper('c-divider');

  const title = block.querySelector('h1');
  title.after(socialDiv);

  socialDiv.appendChild(socialWrapperBefore);

  const socialIconWrapper = createSocialIconWrapper();
  socialDiv.appendChild(socialIconWrapper);

  const socialIconContainer = socialIconWrapper.querySelector('.c-social-divider-icon-container');
  const links = block.querySelectorAll('p');

  for (let i = 0; i < 3 && i < links.length; i += 1) {
    const a = links[i].querySelector('a');
    const socialIcon = document.createElement('i');
    const socialPlatform = Object.keys(iconsMap).find((platform) => a.innerText.includes(platform));

    if (socialPlatform) {
      socialIcon.className = iconsMap[socialPlatform];
      a.innerHTML = '';
      a.appendChild(socialIcon);
      socialIconContainer.appendChild(links[i]);
    }
  }

  socialDiv.appendChild(socialWrapperAfter);
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);
    block.append(footer);
  }

  buildSocialMediaDivider(block);
}
