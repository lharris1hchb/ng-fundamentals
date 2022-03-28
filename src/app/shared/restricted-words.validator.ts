import { FormControl, FormGroup, Validators } from '@angular/forms';


  export function restrictedWordsValidator(words: string[] | null) {
    return (control: FormControl) : {[key:string]: any} | null => {
      if(words?.length) {
        console.log(words);
        var invalidWords = words.filter(w => control.value.includes(w));

        if(invalidWords.length > 0) {
          return { 'restrictedWords' : invalidWords };
        }
      }
      return null;
    }
  }
