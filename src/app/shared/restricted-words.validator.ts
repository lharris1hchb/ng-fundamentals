import { FormControl } from "@angular/forms";


  export function restrictedWords(words: string[] | null) {
    return (control: FormControl) : {[key:string]: any} | null => {
      if(words?.length) {
        var invalidWords = words.filter(w => control.value.includes(w));

        if(invalidWords.length > 0) {
          return { 'restrictedWords' : invalidWords };
        }
      }
      return null;
    }
  }
