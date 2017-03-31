import angular from 'angular';
import 'angular-messages';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import {schools} from './schools.fixture';
import './autocomplete';
import showErrors from './showErrors.filter';

import './modal.scss';

import template from './modal.tpl.html';

let componentName = 'modal';

class ModalController{

  /* @ngInject */
  constructor($window, $http, $log){
    this.$window = $window;
    this.$http = $http;
    this.$log = $log;
    this.schools = schools;

    this.form = {
      contactInfoType: 'phone'
    };
  }

  submit(){
    this.error = false;
    this.contactForm.$setSubmitted();
    if(!this.contactForm.$valid){
      return;
    }

    const ids = {
      staging: {
        survey: 16374,
        firstName: 3457,
        campus: 32498,
        phone: 17,
        email: 5,
        interests: 32508,
        uri: 'https://api-stage.missionhub.com/apis/v4/answer_sheets'
      },
      production: {
        survey: 17500,
        firstName: 3457,
        campus: 36428,
        phone: 17,
        email: 5,
        interests: 36790,
        uri: 'https://api.missionhub.com/apis/v4/answer_sheets'
      }
    };

    const currentIds = ids.production;

    const interests = keys(pickBy(this.form.interests, i => i === true));

    const data = {
      "data": {
        "type": "answer_sheet",
        "attributes": {},
        "relationships": {
          "survey": {
            "data": {
              "type": "survey",
              "id": currentIds.survey
            }
          }
        }
      },
      "included": [
        {
          "type": "answer",
          "attributes": {
            "question_id": currentIds.firstName,
            "value": this.form.name
          }
        },
        {
          "type": "answer",
          "attributes": {
            "question_id": currentIds.campus,
            "value": this.form.campus
          }
        }
      ]
    };

    if(this.form.contactInfoType === 'phone'){
      data.included.push({
        "type": "answer",
        "attributes": {
          "question_id": currentIds.phone,
          "value": this.form.phone
        }
      });
    }else{
      data.included.push({
        "type": "answer",
        "attributes": {
          "question_id": currentIds.email,
          "value": this.form.email
        }
      });
    }

    for(const interest of interests){
      data.included.push({
        "type": "answer",
        "attributes": {
          "question_id": currentIds.interests,
          "value": interest
        }
      });
    }

    this.$http.post(currentIds.uri, data)
      .then(() => {
        this.thankYou = true;
        this.$window._satellite.track('aa-form-submission-' + this.formId);
      })
      .catch(error => {
        this.$log.error('Error submitting contact info', error);
        this.error = true;
      });
  }
}


export default angular
  .module(componentName, [
    'autocomplete',
    'ngMessages',
    showErrors.name
  ])
  .component(componentName, {
    controller: ModalController,
    templateUrl: template,
    bindings: {
      formId: '<',
      closeModal: '&',
      dismissModal: '&'
    }
  });
