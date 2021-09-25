const pizzaTypes = {
  cheesePizza: 'Cheese Pizza',
  veggiePizza: 'Veggie Pizza',
  pepperoniPizza: 'Pepperoni Pizza',
};

const start = {
  title: "Hello! Let's go!",
  buttonMessage: "That's right!",
  start: true,
};

const choosePizza = {
  title: 'Choose your favorite pizza',
  options: Object.entries(pizzaTypes).map(([key, value]) => ({ value: key, name: value })),
  optionName: 'pizzaType',
};

const finish = (answers = {}) => ({
  title: `That's it! Now we know that you like ${pizzaTypes[answers.pizzaType]}`,
  image: {
    cheesePizza: 'https://images.contentstack.io/v3/assets/bltbb619fd5c667ba2d/blt2d4e43bcebe1548e/60ca60fa1e0505677a881227/Cheese_Pizza.jpg?width=760',
    veggiePizza: 'https://www.ruchiskitchen.com/wp-content/uploads/2016/02/veggie-pizza-2-1.jpg',
    pepperoniPizza: 'https://www.simplyrecipes.com/thmb/HQJVIRwkySb-QiYv6saC9dEjU5A=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-4-82c60893fcad4ade906a8a9f59b8da9d.jpg',
  }[answers.pizzaType],
  finish: true,
});

const cheeseWay = {
  title: 'Wow! I like cheese too!',
  buttonMessage: 'Next',
};

const veggieWay = {
  title: 'Yeah, vegetables!',
  buttonMessage: 'Next',
};

const pepperoniWay = {
  title: 'Nice and spicy circle of meat!',
  buttonMessage: 'Next',
};

start.next = choosePizza;

choosePizza.prev = start;

finish.prev = choosePizza;

cheeseWay.next = finish;
cheeseWay.prev = choosePizza;

veggieWay.next = finish;
veggieWay.prev = choosePizza;

pepperoniWay.next = finish;
pepperoniWay.prev = choosePizza;

choosePizza.pathResolver = {
  cheesePizza: cheeseWay,
  veggiePizza: veggieWay,
  pepperoniPizza: pepperoniWay,
};

export default start;
