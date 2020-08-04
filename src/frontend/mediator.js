import Vue from 'vue'

const MEDIATOR_VUE = new Vue();

/**
 * This file acts as an "Events bus", it's used to centralize the pub/sub of global events across
 * parts of the app that wants to talk to each other without being related !
 *
 * List of implemented events :
 * - APP_READY    = When the application is ready
 */
const MEDIATOR = {
  emit  : MEDIATOR_VUE.$emit.bind(MEDIATOR_VUE),
  on    : MEDIATOR_VUE.$on.bind(MEDIATOR_VUE),
  off   : MEDIATOR_VUE.$off.bind(MEDIATOR_VUE),
  once  : MEDIATOR_VUE.$once.bind(MEDIATOR_VUE),
};

export default MEDIATOR
