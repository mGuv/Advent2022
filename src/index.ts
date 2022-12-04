type SomeType = {
  foo: string;
  bar: number;
};

const x: SomeType = {
  foo: "Hello",
  bar: 123,
};

console.log(`Typescript is working: ${x.foo}=${x.bar}`);
