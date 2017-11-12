/* participantObject EXAMPLE */
/* Example: { firstName: 'Sergey', lastName: 'Zotenko', seniorityLevel: 'intermediate' } */
// const participantObject = {
//     firstName: string,
//     lastName: string,
//     seniorityLevel: string
// }

/* pricingObject EXAMPLE */
/* Example: { 'junior': 10 } */
// const pricingObject = {
//     roleName: number
// }


const project = (function () {
    let instance;
    return {
        getInstance: function () {
            if (!instance) {
                instance = {
                    participants: [],
                    pricing: {},
                    isBusy: false,
                    // instance: {},

                    /* implement initialization of the object */
                    /* participants - predefined array of participants */
                    /* pricing - predefined object (keyvalue collection) of pricing */
                    init(participants, pricing) {
                        if (Array.isArray(participants) && participants.every((item) => 'seniorityLevel' in item)) {
                            this.participants = participants.slice();
                        }
                        if (pricing) {
                            this.pricing = pricing;
                        }
                        this.isBusy = false;
                    },

                    /* pass found participant into callback, stops on first match */
                    /* functor - function that will be executed for elements of participants array */
                    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
                    /* callbackFunction (participant) => {} */
                    findParticipant(functor, callbackFunction) {
                        if (this.isBusy) {
                            return false;
                        }
                        let obj = this;
                        this.isBusy = true;
                        setTimeout(function () {
                            let result = null;
                            for (let i = 0; i < obj.participants.length; i++) {
                                if (functor(obj.participants[i])) {
                                    result = obj.participants[i];
                                    break;
                                }
                            }
                            callbackFunction(result);
                            obj.isBusy = false;
                        });
                    },

                    /* pass array of found participants into callback */
                    /* functor - function that will be executed for elements of participants array */
                    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
                    /* callbackFunction (participantsArray) => {} */
                    findParticipants(functor, callbackFunction) {
                        if (this.isBusy) {
                            return false;
                        }
                        let obj = this;
                        this.isBusy = true;
                        setTimeout(function () {
                            let participantsArray = [];
                            for (let i = 0; i < obj.participants.length; i++) {
                                if (functor(obj.participants[i])) {
                                    participantsArray.push(obj.participants[i]);
                                }
                            }
                            callbackFunction(participantsArray);
                            obj.isBusy = false;
                        });
                    },

                    /* push new participant into this.participants array */
                    /* callbackFunction - function that will be executed when job will be done */
                    /* (err) => {} */
                    addParticipant(participantObject, callbackFunction) {
                        if (this.isBusy) {
                            return false;
                        }
                        let obj = this;
                        this.isBusy = true;
                        setTimeout(function () {
                            if (participantObject && participantObject.hasOwnProperty('seniorityLevel')) {
                                obj.participants.push(participantObject);
                                callbackFunction(undefined);
                            } else {
                                callbackFunction('error while adding participant');
                            }
                            obj.isBusy = false;
                        });
                    },

                    /* push new participant into this.participants array */
                    /* callback should receive removed participant */
                    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
                    removeParticipant(participantObject, callbackFunction) {
                        if (this.isBusy) {
                            return false;
                        }
                        let obj = this;
                        this.isBusy = true;
                        setTimeout(function () {
                            let index = obj.participants.indexOf(participantObject);
                            if (index === -1) {
                                callbackFunction(null);
                            } else {
                                let element = obj.participants[index];
                                obj.participants.splice(index, 1);
                                callbackFunction(element);
                            }
                            obj.isBusy = false;
                        });
                    },

                    /* Extends this.pricing with new field or change existing */
                    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
                    setPricing(participantPriceObject, callbackFunction) {
                        if (project.isBusy) {
                            return false;
                        }
                        let obj = this;
                        this.isBusy = true;
                        setTimeout(function () {
                            for (let key in participantPriceObject) {
                                obj.pricing[key] = participantPriceObject[key];
                            }
                            callbackFunction();
                            obj.isBusy = false;
                        });
                    },

                    /* calculates salary of all participants in the given period */
                    /* periodInDays, has type number, one day is equal 8 working hours */
                    calculateSalary(periodInDays) {
                        let salarySum = 0;
                        for (let i = 0; i < this.participants.length; i++) {
                            let levelPricing = this.pricing[this.participants[i].seniorityLevel];
                            if (levelPricing) {
                                salarySum += this.pricing[this.participants[i].seniorityLevel] * 8 * periodInDays;
                            } else {
                                throw new Error('Can`t find salary for ${project.participants[i].seniorityLevel}');
                            }
                        }
                        return salarySum;
                    }
                };
            }
            return instance;
        }
    }
})();

module.exports = {
    firstName: 'Oleg',
    lastName: 'Zamyslov',
    task: project.getInstance()
};
