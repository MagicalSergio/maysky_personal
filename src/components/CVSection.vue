<script setup>
import BaseContainer from "./base/BaseContainer.vue";
import ScrambleText from "./ScrambleText.vue";
import CVTimeline from "./CVTimeline.vue";

const data = {
  items: [
    {
      name: 'Coffee house \"Owl\"',
    },
    {},
    {},
    {},
    {},
    {},
  ],
};
</script>

<template>
  <section class="cv-section">
    <div class="cv-section__head">
      6 years: from brewing coffee <br />
      to <span>versatile engineer <ScrambleText text="\" /></span>
    </div>

    <div class="cv-section__items">
      <BaseContainer class="cv-section__timeline-container">
        <CVTimeline class="cv-section__timeline" />
      </BaseContainer>

      <div class="cv-section__item">
        <BaseContainer>
          <div class="cv-section__item-content">
            <div class="cv-section__item-date">
              october 2018 — may 2019 (8 months)
            </div>
            <div class="cv-section__item-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              atque doloribus maxime accusamus, delectus earum fugit eveniet at,
              ad dolor, voluptates natus dicta quaerat quisquam quod assumenda
              accusantium? Eum, ducimus. Hic ducimus nisi suscipit obcaecati!
              Culpa accusantium, deleniti, repudiandae maiores ducimus iste
              libero debitis assumenda sapiente exercitationem eveniet officiis
              hic soluta aliquam ipsa quibusdam iusto nobis odio dolorum numquam
              natus! Iste architecto magni ipsa eius. Perspiciatis similique
              accusamus odit fugit provident ratione delectus facere recusandae
              nulla ullam excepturi qui quam saepe perferendis quia omnis, ex
              sint, deleniti eveniet molestias commodi? Tempore officiis veniam
              sunt dolore officia rerum libero distinctio quaerat a ea quae
              magnam, iure provident placeat labore minima odio autem hic
              dolorum nesciunt deserunt quod eligendi eaque? Nemo, illo. Itaque
              culpa nihil assumenda omnis quo ipsum ad enim quaerat id debitis
              voluptate, saepe, voluptas corrupti nesciunt eligendi consequuntur
              cupiditate molestias pariatur architecto minus vel libero eius.
              Fugit, quibusdam qui?
            </div>
          </div>
        </BaseContainer>
      </div>
      <div class="cv-section__item">
        <BaseContainer>
          <div class="cv-section__item-content">
            <div class="cv-section__item-date">
              october 2018 — may 2019 (8 months)
            </div>
            <div class="cv-section__item-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              atque doloribus maxime accusamus, delectus earum fugit eveniet at,
              ad dolor, voluptates natus dicta quaerat quisquam quod assumenda
              accusantium? Eum, ducimus. Hic ducimus nisi suscipit obcaecati!
            </div>
          </div>
        </BaseContainer>
      </div>
      <div class="cv-section__item">
        <BaseContainer>
          <div class="cv-section__item-content">
            <div class="cv-section__item-date">
              october 2018 — may 2019 (8 months)
            </div>
            <div class="cv-section__item-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              atque doloribus maxime accusamus, delectus earum fugit eveniet at,
              ad dolor, voluptates natus dicta quaerat quisquam quod assumenda
              accusantium? Eum, ducimus. Hic ducimus nisi suscipit obcaecati!
              Culpa accusantium, deleniti, repudiandae maiores ducimus iste
              libero debitis assumenda sapiente exercitationem eveniet officiis
              hic soluta aliquam ipsa quibusdam iusto nobis odio dolorum numquam
              natus! Iste architecto magni ipsa eius. Perspiciatis similique
              accusamus odit fugit provident ratione delectus facere recusandae
              nulla ullam excepturi qui quam saepe perferendis quia omnis, ex
              sint, deleniti eveniet molestias commodi? Tempore officiis veniam
            </div>
          </div>
        </BaseContainer>
      </div>
      <div class="cv-section__item">
        <BaseContainer>
          <div class="cv-section__item-content">
            <div class="cv-section__item-date">
              october 2018 — may 2019 (8 months)
            </div>
            <div class="cv-section__item-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              atque doloribus maxime accusamus, delectus earum fugit eveniet at,
              ad dolor, voluptates natus dicta quaerat quisquam quod assumenda
              accusantium? Eum, ducimus. Hic ducimus nisi suscipit obcaecati!
              Culpa accusantium, deleniti, repudiandae maiores ducimus iste
              libero debitis assumenda sapiente exercitationem eveniet officiis
              hic soluta aliquam ipsa quibusdam iusto nobis odio dolorum numquam
            </div>
          </div>
        </BaseContainer>
      </div>
      <div class="cv-section__item">
        <BaseContainer>
          <div class="cv-section__item-content">
            <div class="cv-section__item-date">
              october 2018 — may 2019 (8 months)
            </div>
            <div class="cv-section__item-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              atque doloribus maxime accusamus, delectus earum fugit eveniet at,
              ad dolor, voluptates natus dicta quaerat quisquam quod assumenda
              accusantium? Eum, ducimus. Hic ducimus nisi suscipit obcaecati!
              Culpa accusantium, deleniti, repudiandae maiores ducimus iste
              libero debitis assumenda sapiente exercitationem eveniet officiis
              hic soluta aliquam ipsa quibusdam iusto nobis odio dolorum numquam
              natus! Iste architecto magni ipsa eius. Perspiciatis similique
              accusamus odit fugit provident ratione delectus facere recusandae
            </div>
          </div>
        </BaseContainer>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cv-section {
  $root: &;

  &__head {
    padding: 6rem 0;
    padding-left: calc(50% + 1rem);
    background: $color-bg-add-1;

    span {
      color: $color-font-accent;
    }
  }

  &__item {
    &:nth-child(2n) {
      background: $color-bg-add-1;
    }

    &:nth-child(2) {
      #{$root}__item-content {
        padding-top: 0;
      }
    }
  }

  &__item-content {
    padding: 6rem 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 2rem;
    align-items: start;
    justify-items: start;
  }

  &__timeline-container {
    position: relative;
  }

  &__timeline {
    position: absolute;
    top: 0;
    left: 5rem;
  }

  &__item-date {
    margin-left: 2rem;
    background: $color-bg-add-2;
    color: $color-font-add-1;
    font-weight: 700;
    font-size: 0.8rem;
    position: sticky;
    top: calc(50vh);
  }
}
</style>
