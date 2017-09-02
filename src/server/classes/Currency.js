module.exports = class Currency {
  constructor (name, abbreviation, USDValueInPennies) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.USDValueInPennies = USDValueInPennies;
    this.validators = {
      name: () => {
        const errors = [];
        typeof this.name !== 'string' ? errors.push('Property \'Name\' must be type String') : null;
        return errors;
      },
      abbreviation: () => {
        const errors = [];
        typeof this.abbreviation !== 'string' ? errors.push('Property \'Abbreviation\' must be type String') : null;
        return errors;
      },
      USDValueInPennies: () => {
        const errors = [];
        typeof this.USDValueInPennies !== 'number' || isNaN(this.USDValueInPennies) ? errors.push('Property \'USDValueInPennies\' must be type Number') : null;
        this.USDValueInPennies % 1 !== 0 ? errors.push('Property \'USDValueInPennies\' must be a whole number') : null;
        return errors;
      }
    }
  }

  validate(key) {
    let errors = [];
    const result = {};

    if (key && this.hasOwnProperty(key)) {
      errors = [...this.validators[key]()]
    } else {
      errors = Object.keys(this.validators).reduce((e, v) => {
        return [...e, ...this.validators[v]()]
      }, [])

    }
    if (errors.length) {
      result.isValid = false;
      result.errors = errors
    } else {
      result.isValid = true;
    }
    return result
  }

  getUSDValueInDollars() {
    if (this.validate('USDValueInPennies').isValid) {
      return (this.USDValueInPennies/100).toString()
    } else {
      return NaN;
    }
  }

}
