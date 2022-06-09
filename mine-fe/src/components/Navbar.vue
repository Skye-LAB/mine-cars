<template>
  <header>
    <nav class="pb-2 mb-4 border-bottom border-2 border-dark navbar navbar-expand-lg navbar-light">
      <router-link
        to="/"
        class="d-flex align-items-center text-dark text-decoration-none"
      >
        <slot name="logo" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mobileNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="mobileNav">
        <ul class="navbar-nav mb-2 ms-3 me-auto mb-lg-0">
          <slot name="primary-menu" />
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <slot name="secondary-menu" />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {},
};
</script>

<style></style>
