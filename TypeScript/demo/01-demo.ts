class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const person = new Person('Leon')
console.log(person.name)

// comments

class SelectGirl<T> {
  constructor(private girls: T[]) {}
  getGirl(index: number): T {
    return this.girls[index]
  }
}

// const selectGirl = new SelectGirl(["大脚", "刘英", "晓红"]);
const selectGirl = new SelectGirl<string>(['大脚', '刘英', '晓红'])
// const selectGril = new SelectGirl() < string > ['a', 'b', 'c']
