//Задание 1
function dialogOutPuton(str: string): string {
    const pattern = /^one((out(put)?)|(puton))+(in(pu)?t)?$/;
    return pattern.test(str) ? "YES" : "NO";
  }
  
  function determineDialogs(n: number, strings: string[]): string[] {
    const dialogs: string[] = [];
    for (let i = 0; i < n; i++) {
      dialogs.push(dialogOutPuton(strings[i]));
    }
    return dialogs;
  }

//Задание 2
grab_number_sum(str);
function grab_number_sum(str:string):number
{
    const numbers: number[] = str.match(/\d+/g)?.map(Number) ?? [];
    const sum:number = numbers.reduce((total, current) => total + current, 0);
    return sum;
}

//Задание 3
function sumBurger(d: number, h: number, c: number): number {
    if (d < h && d < c) {           //check time dinner
      return 0;
    }
    if (h < c){             
        const countHumburger = Math.min(Math.floor(d / h), Math.floor(d / c));      
        const countCheeseburger = Math.floor((d - countHumburger * h) / c);
        return countHumburger + countCheeseburger;
    }
    else 
         {
           const countBurger = Math.floor(d/(h+c));   
           return countBurger; 
         }
}

