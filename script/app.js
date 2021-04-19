const mobileMenu = document.querySelector('.header__menu-toggle');
const bookmark = document.querySelector('.btn-bookmark');

mobileMenu.addEventListener('click', openMenu);
bookmark.addEventListener('click', saveBookmark);
document.addEventListener('click', modalStuff);

function openMenu() {
  const nav = document.querySelector('.header__navigation'),
    overlay = document.querySelector('#menu-bg'),
    body = document.querySelector('body'),
    html = document.querySelector('html');

  nav.classList.toggle('open');
  mobileMenu.classList.toggle('toggle-anim');
  overlay.classList.toggle('active');
  body.classList.toggle('active');
  html.classList.toggle('active');
}

function saveBookmark(event) {
  event.preventDefault();

  const bookmarkText = document.querySelector('#right-side p');

  if (bookmark.classList.contains('saved')) {
    bookmark.classList.remove('saved');
    bookmarkText.textContent = 'bookmark';
  } else {
    bookmark.classList.add('saved');
    bookmarkText.textContent = 'bookmarked';
  }
}

function modalStuff(event) {
  const modalBg = document.querySelector('#modal-bg'),
    modal = document.querySelector('.main__back-project-modal'),
    modalSuccess = document.querySelector('.success-modal'),
    target = event.target,
    paidEdition = document.querySelectorAll('.paid-edition'),
    html = document.querySelector('html');

  if (target.classList.contains('open-modal')) {
    openModal(modalBg, modal, html);
  } else if (target.classList.contains('close-modal')) {
    closeModal(modalBg, modal, html);
  } else if (target.classList.contains('btn-checkbox')) {
    const selected = document.querySelectorAll('.modal-card'),
      card = target.parentElement.parentElement;

    selected.forEach(card => {
      card.classList.remove('selected');
      card.childNodes[1].childNodes[1].classList.remove('selected');
      card.childNodes[5].innerHTML = '';
    });

    if (!target.parentElement.parentElement.classList.contains('not-available')) {
      target.classList.add('selected');
      card.classList.add('selected');
    }

    if (card.classList.contains('card-no-reward')) {
      addPledgeField(card);
    } else if (card.classList.contains('bamboo-stand')) {
      addPledgeField(card, 25);
    } else if (card.classList.contains('black-edition-stand')) {
      addPledgeField(card, 75);
    } else {
    }
  } else if (target.classList.contains('go-to-success')) {
    closeModal(modalBg, modal, html);
    openModal(modalBg, modalSuccess, html);
  } else if (target.classList.contains('close-success-modal')) {
    closeModal(modalBg, modalSuccess, html);
  }

  paidEdition.forEach(element =>
    element.addEventListener('submit', () => {
      closeModal(modalBg, modal, html);
      openModal(modalBg, modalSuccess, html);
    })
  );
}

function openModal(modalBg, modal, html) {
  modalBg.classList.add('modal-active');
  modal.classList.add('modal-active');
  html.classList.add('active');
}

function closeModal(modalBg, modal, html) {
  modalBg.classList.remove('modal-active');
  modal.classList.remove('modal-active');
  html.classList.remove('active');
}

function addPledgeField(card, amount) {
  const pledgeArea = card.childNodes[5];

  if (card.classList.contains('card-no-reward')) {
    pledgeArea.innerHTML = `
    <div class="no-reward-pledge-area">
      <a class="btn-primary go-to-success" href="#">Continue</a>
    </div>`;
  } else {
    pledgeArea.innerHTML = `
    <div class="pledge-content">
      <p class="primary-paragraph">Enter your pledge</p>
      <form class="continue-form">
        <input type="number" value="${amount}" min="${amount}" />
        <button class="btn-primary" type="submit">Continue</button>
      </form>
    </div>`;
  }
}
