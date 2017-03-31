import angular from 'angular';


import './content-panel.scss';

import template from './content-panel.tpl.html';

let componentName = 'contentPanel';

class ContentPanelController{

  /* @ngInject */
  constructor($transclude){
    this.$transclude = $transclude;
  }

  $onInit(){
    this.hasIcon = this.$transclude.isSlotFilled('icon');
    this.hasHeading = this.$transclude.isSlotFilled('heading');
    this.hasContent = this.$transclude.isSlotFilled('content');
    this.hasActionText = this.$transclude.isSlotFilled('actionText');
    this.hasActionBtnText = this.$transclude.isSlotFilled('actionBtnText');
  }
}


export default angular
  .module(componentName, [])
  .component(componentName, {
    controller: ContentPanelController,
    templateUrl: template,
    transclude: {
      icon: '?icon',
      heading: '?heading',
      content: '?content',
      actionText: '?actionText',
      actionBtnText: '?actionBtnText'
    },
    bindings: {
      bgClass: '@',
      connected: '<',
      openModal: '&'
    }
  });
