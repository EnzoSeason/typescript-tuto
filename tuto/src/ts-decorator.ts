function Logger(message: string) {
    return function(constructor: Function) {
        console.log(message);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function<T extends { new (...args: any[]): {name: string} }>(
      originalConstructor: T
    ) {
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super();
          console.log('Rendering template');
          const hookEl = document.getElementById(hookId);
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = this.name;
          }
        }
      };
    };
  }

@Logger('Logging Person')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Test {
    constructor(
        public name: string
    ) {}
}


function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
  }

class Printer {
    message = "It works.";

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

interface ValidatorConfig {
    [property: string]: {
      [validatableProp: string]: string[]; // ['required', 'positive']
    };
  }
  
  const registeredValidators: ValidatorConfig = {};
  
  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
    };
  }
  
  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
    };
  }
  
  function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
      return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
          case 'required':
            isValid = isValid && !!obj[prop];
            break;
          case 'positive':
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
    return isValid;
  }
  
  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
  
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }
  
  const courseForm = document.querySelector('form')!;
  courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
  
    const title = titleEl.value;
    const price = +priceEl.value;
  
    const createdCourse = new Course(title, price);
  
    if (!validate(createdCourse)) {
      alert('Invalid input, please try again!');
      return;
    }
    console.log(createdCourse);
  });
  