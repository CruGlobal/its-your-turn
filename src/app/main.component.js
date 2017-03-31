import angular from 'angular';

import connectPanel from './content-panel/content-panel.component';
import modal from './modal/modal.component';

import './main.scss';

import template from './main.tpl.html';

let componentName = 'main';

class MainController{

  /* @ngInject */
  constructor($rootScope){
    this.$rootScope = $rootScope;
  }

  openModal(){
    this.$rootScope.modalOpen = this.modalOpen = true;
  }

  closeModal(){
    this.connected = true;
    this.$rootScope.modalOpen = this.modalOpen = false;
  }

  dismissModal(){
    this.$rootScope.modalOpen = this.modalOpen = false;
  }
}


export default angular
  .module(componentName, [
    connectPanel.name,
    modal.name
  ])
  .component(componentName, {
    controller: MainController,
    templateUrl: template
  });
