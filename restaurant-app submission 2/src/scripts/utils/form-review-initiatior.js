import TheRestoDbSource from '../data/therestodb-source';
import { createFormReviewTemplate } from '../views/templates/template-creator';

const FormReviewInitiator = {
  async init({ formReviewContainer, id }) {
    this._formReviewContainer = formReviewContainer;
    this._id = id;

    await this._renderForm();
  },

  async _renderForm() {
    this._formReviewContainer.innerHTML = createFormReviewTemplate();

    const btnSubmit = document.querySelector('.form-submit');

    btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();

      const inputName = document.querySelector('.textNama');
      const inputReview = document.querySelector('.textReview');
      const form = document.querySelector('form');

      const reviewData = {
        id: this._id,
        name: inputName.value,
        review: inputReview.value,
      };

      if (inputName.value === '') {
        alert('Nama tidak boleh kosong!');
      } else if (inputReview.value === '') {
        alert('Review tidak boleh kosong!');
      } else {
        await TheRestoDbSource.reviewRestaurant(reviewData);
        form.reset();
        alert('Review berhasil ditambahkan!');
        this._renderReview(reviewData.name, reviewData.review);
      }
    });
  },

  _renderReview(name, review) {
    const reviewContainer = document.querySelector('.review-container');
    const date = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const dataReview = `
      <div class="review-card">
        <i class="far fa-user fa-2x"></i>
        <h3 class="review-name">${name}</h3>
        <p class="review-date">${date}</p>
        <p class="review-comment">"${review}"</p>
      </div>
    `;

    reviewContainer.innerHTML += dataReview;
  },
};

export default FormReviewInitiator;
