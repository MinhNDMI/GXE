<template>
  <button
    :class="[
      'btn',
      variant === 'primary' ? 'btn-primary' : 'btn-secondary',
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script> 