export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // Проект использует BEM (block__element--modifier) и camelCase-имена анимаций
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    // Оставляем привычную запись rgba() вместо модерн-нотации
    "color-function-notation": null,
    "alpha-value-notation": null,
    // Намеренные слои-переопределения в дизайне
    "no-duplicate-selectors": null,
    "no-descending-specificity": null,
    "declaration-block-no-redundant-longhand-properties": null,
    // Осознанный «компактный» стиль автора и требования совместимости
    "rule-empty-line-before": null,
    "declaration-block-single-line-max-declarations": null,
    "property-no-vendor-prefix": null, // -webkit-background-clip нужен для градиентного текста в Safari
    "media-feature-range-notation": null, // оставляем max-width для широкой поддержки
  },
};
