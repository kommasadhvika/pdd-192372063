export interface Meal {
  time: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner';
  name: string;
  calories: number;
  image: string;
  ingredients: string[];
  steps: string[];
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export type CuisineKey = 'indian' | 'global';
export type DietKey = 'veg' | 'nonVeg';

// ---------- INDIAN VEGETARIAN ----------
const indianVeg: DayPlan[] = [
{
  day: 'Monday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Oats Idli with Sambar',
    calories: 320,
    image:
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup rolled oats',
    '1/2 cup curd',
    '1/4 cup semolina',
    '1 tsp eno',
    'Curry leaves',
    'Mustard seeds',
    '2 cups sambar'],

    steps: [
    'Dry roast oats until fragrant, then blend into a fine flour.',
    'Mix oats flour, semolina, curd and water into a smooth idli batter.',
    'Add eno just before steaming and pour into greased idli molds.',
    'Steam for 10–12 minutes until a toothpick comes out clean.',
    'Serve hot with warm sambar and coconut chutney.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Multigrain Roti with Palak Paneer',
    calories: 450,
    image:
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 cups multigrain flour',
    '200g paneer cubes',
    '4 cups spinach',
    '1 onion',
    '2 tomatoes',
    'Ginger-garlic paste',
    'Garam masala',
    'Cumin'],

    steps: [
    'Knead multigrain flour with warm water and a pinch of salt; rest 15 minutes.',
    'Blanch spinach for 2 minutes, then blend into a smooth puree.',
    'Sauté onion, ginger-garlic and tomato in 1 tsp oil until soft.',
    'Add spinach puree and spices; simmer 5 minutes.',
    'Fold in paneer cubes and cook 3 more minutes.',
    'Roll and cook rotis on a hot tawa; serve hot together.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Moong Dal Khichdi',
    calories: 300,
    image:
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1/2 cup brown rice',
    '1/2 cup yellow moong dal',
    '1/2 tsp turmeric',
    '1 tsp cumin seeds',
    '1 tsp ghee',
    'Fresh ginger',
    'Salt to taste'],

    steps: [
    'Wash rice and moong dal together until water runs clear.',
    'Pressure cook with 4 cups water, turmeric and salt for 3 whistles.',
    'Heat ghee, splutter cumin and grated ginger.',
    'Pour tempering over the khichdi and mix well.',
    'Serve hot with a dollop of curd.']

  }]

},
{
  day: 'Tuesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Vegetable Poha',
    calories: 290,
    image:
    'https://images.unsplash.com/photo-1626500155690-2bf3cad59c34?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1.5 cups thick poha',
    '1 onion',
    '1 carrot',
    '1/4 cup peas',
    'Curry leaves',
    'Mustard seeds',
    'Lemon',
    'Peanuts'],

    steps: [
    'Rinse poha briefly in a strainer until just soft; drain well.',
    'Sauté mustard seeds, curry leaves and peanuts in 1 tsp oil.',
    'Add chopped onion, carrot and peas; cook 4 minutes.',
    'Stir in turmeric, salt and the drained poha.',
    'Finish with a squeeze of lemon and fresh coriander.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Rajma with Brown Rice',
    calories: 470,
    image:
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup soaked rajma',
    '1 cup brown rice',
    '2 tomatoes',
    '1 onion',
    'Ginger-garlic paste',
    'Garam masala',
    'Kasuri methi'],

    steps: [
    'Pressure cook soaked rajma with salt for 5 whistles.',
    'Make a smooth onion-tomato-ginger-garlic puree.',
    'Sauté puree in 1 tsp oil until oil separates.',
    'Add spices and the cooked rajma with its water.',
    'Simmer 15 minutes; finish with crushed kasuri methi.',
    'Serve over steamed brown rice.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Bhindi Masala with Jowar Roti',
    calories: 310,
    image:
    'https://images.unsplash.com/photo-1631452180539-3a8f5f5b8a8d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g okra',
    '1 onion',
    '1 tomato',
    'Coriander powder',
    'Amchur',
    '1.5 cups jowar flour'],

    steps: [
    'Wash okra, pat completely dry, then slice into rounds.',
    'Stir-fry okra on high heat 6–7 minutes until edges crisp.',
    'Add onion and tomato; cook till soft.',
    'Mix in spices and amchur for tang.',
    'Knead jowar flour with hot water and pat into rotis on a hot tawa.']

  }]

},
{
  day: 'Wednesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Besan Chilla with Mint Chutney',
    calories: 280,
    image:
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup besan',
    '1 onion',
    '1 tomato',
    'Green chili',
    'Mint leaves',
    'Curd',
    'Cumin'],

    steps: [
    'Whisk besan with water, cumin and salt into a pourable batter.',
    'Stir in chopped onion, tomato and chili.',
    'Pour onto a hot non-stick tawa; spread thin.',
    'Cook 2 minutes per side until golden.',
    'Blend mint, curd and salt for a fresh chutney; serve together.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Lauki Chana Dal with Roti',
    calories: 420,
    image:
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup chana dal',
    '2 cups bottle gourd cubes',
    'Tomato',
    'Turmeric',
    'Hing',
    '2 whole wheat rotis'],

    steps: [
    'Soak chana dal 30 minutes; drain.',
    'Pressure cook dal with lauki, tomato and turmeric for 4 whistles.',
    'Temper hing, cumin and red chili in 1 tsp ghee.',
    'Pour tempering over dal and simmer 2 minutes.',
    'Serve hot with fresh phulkas.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Vegetable Daliya',
    calories: 290,
    image:
    'https://images.unsplash.com/photo-1505253213348-cd54c92b37cf?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '3/4 cup broken wheat',
    'Mixed vegetables',
    'Ginger',
    'Cumin',
    'Turmeric',
    'Hot water'],

    steps: [
    'Dry roast daliya until lightly golden and aromatic.',
    'Sauté ginger and cumin in 1 tsp ghee.',
    'Add diced vegetables and stir 2 minutes.',
    'Pour in 3 cups hot water with turmeric and salt.',
    'Pressure cook 2 whistles; rest, then fluff with a fork.']

  }]

},
{
  day: 'Thursday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Ragi Dosa with Coconut Chutney',
    calories: 300,
    image:
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup ragi flour',
    '1/2 cup rice flour',
    '1/4 cup curd',
    'Cumin',
    'Coconut',
    'Green chili'],

    steps: [
    'Mix ragi flour, rice flour, curd, salt and water into a thin batter.',
    'Rest the batter for 20 minutes.',
    'Pour a ladle on a hot tawa and spread thin.',
    'Drizzle 1 tsp oil and cook until crisp.',
    'Grind coconut, chili and salt for chutney and serve.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Chole with Bajra Roti',
    calories: 460,
    image:
    'https://images.unsplash.com/photo-1626777553635-fa2bba2c8e88?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup soaked chickpeas',
    '1 cup bajra flour',
    'Onion',
    'Tomato',
    'Chole masala',
    'Tea bag (for color)'],

    steps: [
    'Pressure cook chickpeas with a tea bag and salt for 4 whistles.',
    'Sauté onion and tomato until pulpy.',
    'Add chole masala and the cooked chickpeas with their stock.',
    'Simmer 15 minutes for thick gravy.',
    'Knead bajra flour with hot water and pat rotis on a hot tawa.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Stuffed Capsicum with Paneer',
    calories: 320,
    image:
    'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '4 capsicums',
    '150g paneer crumbles',
    'Onion',
    'Coriander',
    'Chaat masala',
    'Cumin'],

    steps: [
    'Slice tops off capsicums and scoop out seeds.',
    'Mix crumbled paneer with onion, coriander, chaat masala and salt.',
    'Stuff the capsicums tightly and cap with their tops.',
    'Pan-roast on low heat with a lid, turning every 3 minutes.',
    'Cook 15 minutes until skins blister; serve warm.']

  }]

},
{
  day: 'Friday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Sprouts Salad Bowl',
    calories: 260,
    image:
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup mixed sprouts',
    'Cucumber',
    'Tomato',
    'Onion',
    'Lemon',
    'Black salt',
    'Coriander'],

    steps: [
    'Steam sprouts for 4 minutes until just tender.',
    'Chop cucumber, tomato and onion fine.',
    'Combine sprouts and vegetables in a bowl.',
    'Squeeze lemon and season with black salt, chaat masala and chili.',
    'Garnish with fresh coriander and serve.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Vegetable Pulao with Raita',
    calories: 440,
    image:
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup basmati rice',
    'Mixed vegetables',
    'Whole spices',
    'Mint',
    'Curd',
    'Cucumber'],

    steps: [
    'Soak basmati rice for 20 minutes; drain.',
    'Sauté whole spices in 1 tsp ghee until fragrant.',
    'Add mixed vegetables and rice; stir 1 minute.',
    'Pour in 2 cups water with salt; cook covered until done.',
    'Whisk curd with grated cucumber, cumin powder and salt for raita.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Tofu Bhurji with Multigrain Toast',
    calories: 330,
    image:
    'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g firm tofu',
    'Onion',
    'Tomato',
    'Capsicum',
    'Turmeric',
    'Garam masala',
    '2 slices multigrain bread'],

    steps: [
    'Crumble tofu with your fingers into small bits.',
    'Sauté onion, capsicum and tomato in 1 tsp oil.',
    'Add turmeric, garam masala and salt.',
    'Fold in the crumbled tofu and cook 4 minutes.',
    'Toast multigrain bread and pile bhurji on top.']

  }]

},
{
  day: 'Saturday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Methi Thepla with Curd',
    calories: 310,
    image:
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1.5 cups whole wheat flour',
    '1 cup chopped fenugreek leaves',
    'Turmeric',
    'Ajwain',
    'Curd',
    'Garlic'],

    steps: [
    'Wash methi leaves and chop fine.',
    'Mix flour, methi, spices, garlic and 2 tbsp curd.',
    'Knead into a soft dough with water.',
    'Roll thin theplas and cook on a hot tawa with a few drops of oil.',
    'Serve hot with chilled curd.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Mixed Dal Tadka with Roti',
    calories: 430,
    image:
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1/4 cup each of toor, masoor and moong dal',
    'Garlic',
    'Cumin',
    'Dry red chili',
    'Ghee',
    'Tomato'],

    steps: [
    'Wash the three dals together and pressure cook with turmeric for 4 whistles.',
    'Mash lightly and adjust water for a flowing consistency.',
    'Heat ghee, splutter cumin, garlic and dry red chili.',
    'Pour the tadka over the dal and cover for 2 minutes.',
    'Serve with hot phulkas.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Baingan Bharta with Roti',
    calories: 340,
    image:
    'https://images.unsplash.com/photo-1631452180539-3a8f5f5b8a8d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 large eggplant',
    'Onion',
    'Tomato',
    'Garlic',
    'Green chili',
    'Coriander'],

    steps: [
    'Roast eggplant directly over flame until skin is charred.',
    'Cool, peel and mash the smoky flesh.',
    'Sauté onion, garlic, chili and tomato in 1 tsp mustard oil.',
    'Add the mashed eggplant and cook 5 minutes.',
    'Garnish with coriander and serve with phulkas.']

  }]

},
{
  day: 'Sunday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Quinoa Upma',
    calories: 300,
    image:
    'https://images.unsplash.com/photo-1505253213348-cd54c92b37cf?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup quinoa',
    'Onion',
    'Carrot',
    'Beans',
    'Mustard seeds',
    'Urad dal',
    'Curry leaves'],

    steps: [
    'Rinse quinoa thoroughly and toast 2 minutes.',
    'Temper mustard seeds, urad dal and curry leaves in 1 tsp oil.',
    'Add chopped vegetables and sauté 3 minutes.',
    'Stir in toasted quinoa and 2 cups water with salt.',
    'Cover and cook on low until fluffy, about 12 minutes.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Paneer Butter Masala (Light) with Roti',
    calories: 480,
    image:
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g paneer',
    '3 tomatoes',
    '10 cashews',
    'Ginger-garlic paste',
    'Kasuri methi',
    'Whole wheat roti'],

    steps: [
    'Blanch tomatoes and cashews together for 5 minutes.',
    'Blend into a smooth puree once cool.',
    'Sauté ginger-garlic in 1 tsp butter; pour in puree.',
    'Simmer with spices for 10 minutes until thickened.',
    'Add paneer and crushed kasuri methi; cook 3 minutes.',
    'Serve with fresh phulkas.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Mushroom Matar Curry with Roti',
    calories: 350,
    image:
    'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g mushrooms',
    '1/2 cup peas',
    'Onion',
    'Tomato',
    'Ginger',
    'Garam masala'],

    steps: [
    'Clean and slice mushrooms thick.',
    'Sauté onion-ginger-tomato until pulpy.',
    'Add mushrooms and peas; cook on high 5 minutes to release water.',
    'Add spices and a splash of water; simmer 5 minutes.',
    'Garnish with coriander and serve with roti.']

  }]

}];


// ---------- INDIAN NON-VEG ----------
const indianNonVeg: DayPlan[] = [
{
  day: 'Monday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Masala Omelette with Brown Bread',
    calories: 350,
    image:
    'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 eggs',
    'Onion',
    'Tomato',
    'Green chili',
    'Coriander',
    '2 slices brown bread'],

    steps: [
    'Whisk eggs with a pinch of salt and pepper.',
    'Stir in chopped onion, tomato, chili and coriander.',
    'Cook on a non-stick pan with 1 tsp oil on low heat.',
    'Fold once edges set; cook 1 more minute.',
    'Toast brown bread and serve alongside.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Grilled Chicken Tikka with Quinoa',
    calories: 500,
    image:
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g chicken breast',
    '1/2 cup hung curd',
    'Tikka masala',
    'Lemon',
    'Ginger-garlic paste',
    '1 cup quinoa'],

    steps: [
    'Cube chicken and marinate in curd, ginger-garlic, tikka masala and lemon for 30 minutes.',
    'Thread on skewers and grill 12–15 minutes, turning halfway.',
    'Cook quinoa in 2 cups water until fluffy.',
    'Plate chicken over quinoa with onion rings and lemon.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Fish Curry with Brown Rice',
    calories: 420,
    image:
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g fish fillets',
    'Tomato',
    'Onion',
    'Coconut milk',
    'Curry leaves',
    'Turmeric',
    '1 cup brown rice'],

    steps: [
    'Marinate fish with turmeric and salt for 10 minutes.',
    'Sauté onion and curry leaves in 1 tsp coconut oil.',
    'Add tomato and spices; cook till soft.',
    'Pour coconut milk and simmer 5 minutes.',
    'Slip in fish and cook 6 minutes; serve over brown rice.']

  }]

},
{
  day: 'Tuesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Egg Bhurji with Roti',
    calories: 340,
    image:
    'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '3 eggs',
    'Onion',
    'Tomato',
    'Green chili',
    'Turmeric',
    '2 whole wheat rotis'],

    steps: [
    'Sauté onion and chili in 1 tsp oil till translucent.',
    'Add tomato and cook until pulpy.',
    'Pour beaten eggs and scramble on low heat.',
    'Sprinkle turmeric, salt and coriander.',
    'Serve hot with phulkas.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Chicken Curry with Bajra Roti',
    calories: 510,
    image:
    'https://images.unsplash.com/photo-1626777553635-fa2bba2c8e88?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g bone-in chicken',
    'Onion',
    'Tomato',
    'Curd',
    'Garam masala',
    '1 cup bajra flour'],

    steps: [
    'Brown chicken pieces in 1 tsp oil and remove.',
    'Sauté onions golden, add ginger-garlic and tomato.',
    'Stir in spices and curd; cook till oil separates.',
    'Return chicken with 1 cup water; simmer covered 20 minutes.',
    'Knead bajra flour and pat rotis on a hot tawa.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Tandoori Prawns with Cucumber Salad',
    calories: 360,
    image:
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g prawns',
    'Hung curd',
    'Tandoori masala',
    'Lemon',
    'Cucumber',
    'Onion'],

    steps: [
    'Clean and devein prawns thoroughly.',
    'Marinate in curd, tandoori masala and lemon for 20 minutes.',
    'Sear on a hot grill pan 2 minutes per side.',
    'Toss cucumber and onion with lemon and mint.',
    'Serve prawns hot over the crisp salad.']

  }]

},
{
  day: 'Wednesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Boiled Eggs with Avocado Toast',
    calories: 330,
    image:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 eggs',
    '1/2 avocado',
    '2 slices multigrain bread',
    'Lemon',
    'Chili flakes'],

    steps: [
    'Boil eggs 8 minutes for firm yolks.',
    'Mash avocado with lemon, salt and chili flakes.',
    'Toast multigrain bread until golden.',
    'Spread mashed avocado generously.',
    'Top with sliced eggs and a pinch of pepper.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Keema Matar with Roti',
    calories: 490,
    image:
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g minced chicken',
    '1/2 cup peas',
    'Onion',
    'Tomato',
    'Ginger-garlic paste',
    'Garam masala'],

    steps: [
    'Sauté onion, ginger-garlic till golden.',
    'Add tomato and spices; cook till pulpy.',
    'Stir in minced chicken; brown 5 minutes.',
    'Add peas and 1/2 cup water; simmer 15 minutes covered.',
    'Garnish with coriander and serve with hot rotis.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Grilled Fish with Stir-fry Veggies',
    calories: 380,
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g fish fillet',
    'Bell peppers',
    'Broccoli',
    'Garlic',
    'Lemon',
    'Black pepper'],

    steps: [
    'Marinate fish in lemon, pepper, garlic and salt 15 minutes.',
    'Grill 4 minutes per side until flakes easily.',
    'Heat 1 tsp oil; stir-fry garlic and vegetables on high.',
    'Season with soy and pepper; toss 3 minutes.',
    'Plate fish over the bright vegetables.']

  }]

},
{
  day: 'Thursday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Egg Paratha (Whole Wheat)',
    calories: 360,
    image:
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 eggs',
    '1 cup whole wheat flour',
    'Onion',
    'Coriander',
    'Green chili'],

    steps: [
    'Knead a soft dough with whole wheat flour and water.',
    'Roll a paratha and cook one side on the tawa.',
    'Flip and pour seasoned beaten egg on the cooked side.',
    'Sprinkle onion and coriander on the egg.',
    'Cover, cook 1 minute, flip and finish till golden.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Methi Chicken with Brown Rice',
    calories: 500,
    image:
    'https://images.unsplash.com/photo-1626777553635-fa2bba2c8e88?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g chicken',
    '2 cups fresh fenugreek leaves',
    'Onion',
    'Curd',
    'Garam masala',
    '1 cup brown rice'],

    steps: [
    'Marinate chicken in curd and spices 20 minutes.',
    'Sauté onion till golden in 1 tsp oil.',
    'Add chicken and brown 5 minutes.',
    'Stir in chopped methi and cook covered 15 minutes.',
    'Serve with steamed brown rice.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Chicken Clear Soup',
    calories: 280,
    image:
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g chicken pieces',
    'Carrot',
    'Cabbage',
    'Spring onion',
    'Garlic',
    'Black pepper'],

    steps: [
    'Simmer chicken with garlic and ginger in 4 cups water 25 minutes.',
    'Strain stock and shred the chicken.',
    'Bring stock back to boil; add julienned vegetables.',
    'Return shredded chicken and season with pepper.',
    'Garnish with spring onions and serve hot.']

  }]

},
{
  day: 'Friday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Scrambled Eggs with Sautéed Spinach',
    calories: 320,
    image:
    'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '3 eggs',
    '2 cups spinach',
    'Garlic',
    'Black pepper',
    '1 slice multigrain toast'],

    steps: [
    'Whisk eggs with salt and pepper.',
    'Sauté garlic in 1 tsp olive oil.',
    'Add spinach and wilt 1 minute.',
    'Pour eggs and scramble gently till just set.',
    'Serve over a slice of multigrain toast.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Mutton Soup with Vegetables',
    calories: 470,
    image:
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g mutton with bone',
    'Onion',
    'Carrot',
    'Pepper',
    'Garlic',
    'Coriander'],

    steps: [
    'Pressure cook mutton with garlic, salt and 4 cups water for 25 minutes.',
    'Strain stock; shred meat from the bones.',
    'Sauté onion in 1 tsp oil till golden.',
    'Add carrots, stock and shredded meat; simmer 10 minutes.',
    'Finish with black pepper and fresh coriander.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Pan-Seared Fish Tikka with Salad',
    calories: 350,
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g fish fillet',
    'Curd',
    'Tikka masala',
    'Mixed greens',
    'Lemon'],

    steps: [
    'Cube fish and marinate in curd and tikka masala 15 minutes.',
    'Sear in a hot non-stick pan 3 minutes per side.',
    'Toss mixed greens with lemon, salt and pepper.',
    'Plate fish over salad; serve with lemon wedges.']

  }]

},
{
  day: 'Saturday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Chicken Sandwich (Multigrain)',
    calories: 370,
    image:
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '100g shredded boiled chicken',
    'Hung curd',
    'Lettuce',
    'Tomato',
    'Black pepper',
    '2 slices multigrain bread'],

    steps: [
    'Mix shredded chicken with hung curd, pepper and salt.',
    'Toast multigrain bread lightly.',
    'Layer lettuce, chicken mix and tomato.',
    'Top with the second slice and press gently.',
    'Slice diagonally and serve.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Chicken Biryani (Brown Rice)',
    calories: 530,
    image:
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g chicken',
    '1 cup brown basmati',
    'Onion',
    'Curd',
    'Mint',
    'Whole spices'],

    steps: [
    'Marinate chicken in curd and spices for 30 minutes.',
    'Fry onions golden brown, set aside.',
    'Cook brown basmati 70% with whole spices; drain.',
    'Layer chicken, rice, fried onions and mint in a pot.',
    'Dum cook on the lowest flame 25 minutes; rest 10 minutes before opening.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Egg Curry with Roti',
    calories: 400,
    image:
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '4 boiled eggs',
    'Onion',
    'Tomato',
    'Coconut milk',
    'Garam masala',
    '2 rotis'],

    steps: [
    'Slit boiled eggs lightly so the masala soaks in.',
    'Sauté onion-tomato paste in 1 tsp oil until thick.',
    'Add spices and 1/2 cup coconut milk; simmer 5 minutes.',
    'Slip in eggs and coat with gravy.',
    'Garnish with coriander; serve with rotis.']

  }]

},
{
  day: 'Sunday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Anda Bhurji Wrap',
    calories: 380,
    image:
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '3 eggs',
    'Onion',
    'Capsicum',
    'Whole wheat wrap',
    'Coriander',
    'Chili sauce'],

    steps: [
    'Scramble eggs with onion, capsicum and salt.',
    'Warm a whole wheat wrap on tawa.',
    'Spread a thin layer of chili sauce.',
    'Pile bhurji along one edge and roll tight.',
    'Slice in half and serve warm.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Andhra Chicken Curry with Rice',
    calories: 510,
    image:
    'https://images.unsplash.com/photo-1626777553635-fa2bba2c8e88?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '300g chicken',
    'Onion',
    'Green chilies',
    'Curry leaves',
    'Coconut',
    '1 cup brown rice'],

    steps: [
    'Brown onions and green chilies in 1 tsp oil.',
    'Add ginger-garlic and chicken; sear 5 minutes.',
    'Stir in ground coconut and spices.',
    'Simmer with 1 cup water for 20 minutes.',
    'Serve over steamed brown rice.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Pepper Prawns with Sautéed Greens',
    calories: 360,
    image:
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g prawns',
    'Crushed black pepper',
    'Garlic',
    'Curry leaves',
    'Spinach'],

    steps: [
    'Clean prawns and pat dry.',
    'Sear in 1 tsp oil with garlic and curry leaves 2 minutes.',
    'Sprinkle generous black pepper and toss.',
    'In a separate pan, wilt spinach with garlic.',
    'Plate prawns alongside the greens.']

  }]

}];


// ---------- GLOBAL VEG ----------
const globalVeg: DayPlan[] = [
{
  day: 'Monday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Avocado Toast with Seeds',
    calories: 310,
    image:
    'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 slices sourdough',
    '1 ripe avocado',
    'Chia seeds',
    'Lemon',
    'Chili flakes'],

    steps: [
    'Toast sourdough until golden and crisp.',
    'Halve avocado and scoop into a bowl.',
    'Mash with lemon juice, salt and chili flakes.',
    'Spread thickly over the toast.',
    'Sprinkle chia seeds and a drizzle of olive oil.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Mediterranean Chickpea Salad',
    calories: 400,
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup cooked chickpeas',
    'Cucumber',
    'Cherry tomatoes',
    'Red onion',
    'Feta',
    'Olive oil',
    'Lemon'],

    steps: [
    'Rinse chickpeas well and drain.',
    'Dice cucumber, halve tomatoes, slice onion thin.',
    'Combine in a bowl with crumbled feta.',
    'Whisk olive oil, lemon, oregano and salt.',
    'Toss and rest 5 minutes before serving.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Zucchini Noodles with Pesto',
    calories: 280,
    image:
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 zucchinis',
    '1 cup basil',
    '2 tbsp pine nuts',
    'Parmesan',
    'Garlic',
    'Olive oil'],

    steps: [
    'Spiralize zucchini into long noodles.',
    'Blend basil, pine nuts, parmesan, garlic and olive oil.',
    'Heat a pan and toss zucchini for 1 minute only.',
    'Add pesto off heat and stir to coat.',
    'Top with extra parmesan and pine nuts.']

  }]

},
{
  day: 'Tuesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Overnight Oats with Berries',
    calories: 290,
    image:
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1/2 cup rolled oats',
    '1 cup almond milk',
    'Chia seeds',
    'Mixed berries',
    'Cinnamon'],

    steps: [
    'Combine oats, almond milk and chia in a jar.',
    'Stir in cinnamon and a touch of honey if needed.',
    'Refrigerate overnight (at least 6 hours).',
    'Top with fresh berries before serving.',
    'Add a sprinkle of nuts for crunch.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Quinoa Buddha Bowl',
    calories: 420,
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup cooked quinoa',
    'Roasted chickpeas',
    'Kale',
    'Sweet potato',
    'Tahini',
    'Lemon'],

    steps: [
    'Roast sweet potato cubes at 200°C for 25 minutes.',
    'Massage kale with olive oil and salt.',
    'Pan-toast chickpeas with paprika till crisp.',
    'Whisk tahini, lemon and water into a dressing.',
    'Arrange everything over quinoa and drizzle with dressing.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Lentil Soup with Crusty Bread',
    calories: 360,
    image:
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup brown lentils',
    'Carrot',
    'Celery',
    'Onion',
    'Tomato',
    '1 slice whole grain bread'],

    steps: [
    'Sauté onion, carrot and celery in 1 tsp olive oil.',
    'Add lentils, tomato and 4 cups water.',
    'Simmer 30 minutes until lentils are tender.',
    'Season with salt, pepper and a squeeze of lemon.',
    'Serve hot with crusty whole grain bread.']

  }]

},
{
  day: 'Wednesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Greek Yogurt Parfait',
    calories: 280,
    image:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup plain greek yogurt',
    'Granola (low sugar)',
    'Strawberries',
    'Honey',
    'Almonds'],

    steps: [
    'Layer yogurt at the bottom of a glass.',
    'Add a layer of granola and sliced strawberries.',
    'Repeat the layers once.',
    'Drizzle a teaspoon of honey on top.',
    'Finish with slivered almonds.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Caprese Pasta Salad (Whole Wheat)',
    calories: 430,
    image:
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup whole wheat pasta',
    'Cherry tomatoes',
    'Mozzarella balls',
    'Basil',
    'Olive oil',
    'Balsamic vinegar'],

    steps: [
    'Cook pasta al dente; rinse and cool.',
    'Halve tomatoes and mozzarella balls.',
    'Tear basil leaves over the top.',
    'Whisk olive oil and balsamic with salt.',
    'Toss everything together and chill 10 minutes.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Roasted Cauliflower Steak',
    calories: 300,
    image:
    'https://images.unsplash.com/photo-1505253213348-cd54c92b37cf?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 head cauliflower',
    'Olive oil',
    'Garlic',
    'Paprika',
    'Tahini sauce',
    'Parsley'],

    steps: [
    'Slice cauliflower into 2cm thick steaks.',
    'Brush with olive oil and sprinkle paprika and garlic.',
    'Roast at 220°C for 25 minutes, flipping once.',
    'Drizzle tahini sauce over the top.',
    'Garnish with parsley and lemon zest.']

  }]

},
{
  day: 'Thursday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Veggie Scramble (Tofu)',
    calories: 290,
    image:
    'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g firm tofu',
    'Bell pepper',
    'Spinach',
    'Turmeric',
    'Nutritional yeast',
    'Black salt'],

    steps: [
    'Crumble tofu in a bowl.',
    'Sauté bell pepper in 1 tsp olive oil.',
    'Add tofu, turmeric and black salt; stir 3 minutes.',
    'Toss in spinach until just wilted.',
    'Finish with nutritional yeast for cheesy depth.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Mexican Bean Bowl',
    calories: 440,
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup black beans',
    'Brown rice',
    'Corn',
    'Avocado',
    'Salsa',
    'Cilantro',
    'Lime'],

    steps: [
    'Warm black beans with cumin and a pinch of salt.',
    'Cook brown rice fluffy.',
    'Layer rice, beans, corn and salsa in a bowl.',
    'Top with sliced avocado.',
    'Finish with cilantro and a squeeze of lime.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Stuffed Portobello Mushrooms',
    calories: 310,
    image:
    'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '4 large portobello caps',
    'Spinach',
    'Ricotta',
    'Garlic',
    'Parmesan',
    'Herbs'],

    steps: [
    'Wipe mushroom caps clean and remove stems.',
    'Sauté garlic and spinach till wilted.',
    'Mix with ricotta, herbs and salt.',
    'Spoon filling into the caps.',
    'Bake at 200°C for 15 minutes; top with parmesan.']

  }]

},
{
  day: 'Friday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Chia Pudding with Mango',
    calories: 270,
    image:
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '3 tbsp chia seeds',
    '1 cup coconut milk',
    'Diced mango',
    'Vanilla',
    'Honey'],

    steps: [
    'Whisk chia seeds into coconut milk with vanilla.',
    'Refrigerate 4 hours or overnight.',
    'Stir well to break clumps.',
    'Top with diced mango.',
    'Drizzle a small spoon of honey.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Falafel Wrap with Hummus',
    calories: 460,
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup chickpeas',
    'Parsley',
    'Garlic',
    'Cumin',
    'Whole wheat wrap',
    'Hummus',
    'Lettuce'],

    steps: [
    'Blend soaked chickpeas, parsley, garlic and spices into a coarse paste.',
    'Shape into small patties.',
    'Pan-fry in 1 tsp oil 3 minutes per side.',
    'Warm wrap, spread hummus and add lettuce.',
    'Add falafels, roll tight and slice.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Eggplant Parmesan (Light)',
    calories: 340,
    image:
    'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 large eggplant',
    'Tomato sauce',
    'Mozzarella',
    'Basil',
    'Parmesan'],

    steps: [
    'Slice eggplant 1cm thick and salt for 15 minutes.',
    'Pat dry and brush with olive oil.',
    'Bake at 200°C for 15 minutes till tender.',
    'Layer with tomato sauce, basil and mozzarella.',
    'Bake 10 more minutes; finish with parmesan.']

  }]

},
{
  day: 'Saturday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Smoothie Bowl',
    calories: 300,
    image:
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 frozen banana',
    '1 cup berries',
    '1/2 cup yogurt',
    'Granola',
    'Coconut flakes'],

    steps: [
    'Blend banana, berries and yogurt until thick.',
    'Pour into a wide bowl.',
    'Arrange granola on one half.',
    'Add coconut flakes and fresh fruit.',
    'Eat with a spoon, cold and creamy.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Tabbouleh with Hummus',
    calories: 410,
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1/2 cup bulgur',
    'Parsley',
    'Mint',
    'Tomato',
    'Cucumber',
    'Lemon',
    'Hummus'],

    steps: [
    'Soak bulgur in hot water 15 minutes; drain.',
    'Chop parsley, mint, tomato and cucumber very fine.',
    'Mix with bulgur, olive oil, lemon and salt.',
    'Rest 10 minutes for flavors to meld.',
    'Serve a generous scoop of hummus alongside.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Spaghetti Squash with Marinara',
    calories: 290,
    image:
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 spaghetti squash',
    'Tomato sauce',
    'Basil',
    'Garlic',
    'Olive oil',
    'Parmesan'],

    steps: [
    'Halve and seed the squash; roast cut-side down 40 minutes at 200°C.',
    'Scrape strands with a fork.',
    'Heat marinara with garlic and basil.',
    'Toss squash strands in the sauce.',
    'Top with parmesan and serve.']

  }]

},
{
  day: 'Sunday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Whole Grain Pancakes with Berries',
    calories: 330,
    image:
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup oat flour',
    '1 egg',
    'Almond milk',
    'Baking powder',
    'Berries',
    'Maple syrup'],

    steps: [
    'Whisk oat flour, baking powder and salt.',
    'Beat egg with almond milk and add to dry mix.',
    'Cook small pancakes on a non-stick pan.',
    'Flip when bubbles form on the surface.',
    'Stack and top with berries and a touch of maple syrup.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Roasted Veg Wholewheat Pasta',
    calories: 450,
    image:
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup whole wheat pasta',
    'Bell peppers',
    'Zucchini',
    'Cherry tomatoes',
    'Garlic',
    'Olive oil'],

    steps: [
    'Roast bell peppers, zucchini and tomatoes at 220°C for 20 minutes.',
    'Cook pasta al dente; reserve 1/4 cup water.',
    'Sauté garlic in olive oil briefly.',
    'Toss pasta with roasted veg and pasta water.',
    'Season generously with black pepper and parmesan.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Thai Vegetable Curry with Brown Rice',
    calories: 400,
    image:
    'https://images.unsplash.com/photo-1505253213348-cd54c92b37cf?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    'Thai green curry paste',
    'Coconut milk',
    'Tofu',
    'Mixed vegetables',
    'Lime',
    'Brown rice'],

    steps: [
    'Heat curry paste in 1 tsp oil for 1 minute.',
    'Pour in coconut milk and bring to a gentle simmer.',
    'Add tofu and mixed vegetables; cook 8 minutes.',
    'Finish with lime juice and a pinch of sugar.',
    'Serve over steamed brown rice.']

  }]

}];


// ---------- GLOBAL NON-VEG ----------
const globalNonVeg: DayPlan[] = [
{
  day: 'Monday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Greek Yogurt with Berries',
    calories: 290,
    image:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 cup plain greek yogurt',
    'Mixed berries',
    'Almonds',
    'Chia seeds',
    'Honey'],

    steps: [
    'Scoop greek yogurt into a bowl.',
    'Wash mixed berries and pat dry.',
    'Arrange berries over the yogurt.',
    'Top with crushed almonds and chia seeds.',
    'Drizzle a small spoon of honey.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Grilled Salmon with Asparagus',
    calories: 480,
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g salmon fillet',
    'Asparagus',
    'Lemon',
    'Garlic',
    'Olive oil',
    'Black pepper'],

    steps: [
    'Pat salmon dry; season with salt, pepper and garlic.',
    'Trim asparagus and toss in olive oil.',
    'Roast both at 200°C for 12 minutes.',
    'Squeeze lemon over the fish before serving.',
    'Plate with the bright green asparagus.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Turkey Meatballs with Salad',
    calories: 380,
    image:
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g ground turkey',
    'Egg',
    'Herbs',
    'Garlic',
    'Mixed greens',
    'Cherry tomatoes'],

    steps: [
    'Mix turkey with egg, garlic, herbs and salt.',
    'Shape into 12 small meatballs.',
    'Bake at 200°C for 18 minutes.',
    'Toss mixed greens and tomatoes with vinaigrette.',
    'Pile meatballs over the salad.']

  }]

},
{
  day: 'Tuesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Egg White Veggie Scramble',
    calories: 280,
    image:
    'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '4 egg whites',
    'Spinach',
    'Mushrooms',
    'Bell pepper',
    'Feta',
    '1 slice multigrain toast'],

    steps: [
    'Sauté mushrooms and bell pepper in 1 tsp olive oil.',
    'Add spinach and wilt 30 seconds.',
    'Pour egg whites and scramble gently.',
    'Crumble feta over the top.',
    'Serve alongside a slice of multigrain toast.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Chicken Caesar Salad (Light)',
    calories: 450,
    image:
    'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g grilled chicken breast',
    'Romaine lettuce',
    'Parmesan',
    'Light yogurt dressing',
    'Whole grain croutons'],

    steps: [
    'Grill seasoned chicken 5 minutes per side; slice.',
    'Chop romaine and place in a large bowl.',
    'Toss with light yogurt-based caesar dressing.',
    'Top with sliced chicken and parmesan shavings.',
    'Add a few whole grain croutons for crunch.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Baked Cod with Roasted Veg',
    calories: 360,
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g cod fillet',
    'Zucchini',
    'Bell pepper',
    'Cherry tomatoes',
    'Lemon',
    'Olive oil'],

    steps: [
    'Arrange vegetables on a baking tray and drizzle olive oil.',
    'Roast at 200°C for 10 minutes.',
    'Add cod fillet on top; squeeze lemon and add herbs.',
    'Bake 12 more minutes until cod flakes.',
    'Plate together with the lemony pan juices.']

  }]

},
{
  day: 'Wednesday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Smoked Salmon Bagel (Multigrain)',
    calories: 350,
    image:
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 multigrain bagel',
    '50g smoked salmon',
    'Cream cheese (light)',
    'Capers',
    'Red onion',
    'Dill'],

    steps: [
    'Slice and toast the bagel.',
    'Spread light cream cheese on each half.',
    'Layer smoked salmon on top.',
    'Add thin red onion rings and capers.',
    'Garnish with fresh dill and black pepper.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Tuna Quinoa Salad',
    calories: 420,
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '1 can tuna in water',
    '1 cup cooked quinoa',
    'Cucumber',
    'Cherry tomatoes',
    'Olives',
    'Lemon vinaigrette'],

    steps: [
    'Drain and flake tuna into a bowl.',
    'Add cooled quinoa and chopped vegetables.',
    'Whisk lemon, olive oil, mustard and salt.',
    'Toss everything together gently.',
    'Chill 10 minutes before serving.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Chicken Stir-fry with Cauliflower Rice',
    calories: 380,
    image:
    'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g chicken strips',
    'Broccoli',
    'Bell pepper',
    'Soy sauce',
    'Ginger',
    'Cauliflower rice'],

    steps: [
    'Heat 1 tsp sesame oil in a wok on high.',
    'Sear chicken 3 minutes; remove.',
    'Stir-fry ginger, broccoli and pepper 3 minutes.',
    'Return chicken and add soy sauce.',
    'Serve over warm cauliflower rice.']

  }]

},
{
  day: 'Thursday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Veggie & Turkey Omelette',
    calories: 330,
    image:
    'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '3 eggs',
    '50g turkey breast',
    'Spinach',
    'Mushrooms',
    'Cheese (low-fat)'],

    steps: [
    'Sauté turkey, mushrooms and spinach in 1 tsp oil.',
    'Whisk eggs with salt and pepper.',
    'Pour eggs over filling on low heat.',
    'Sprinkle cheese once edges set.',
    'Fold in half and serve hot.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Shrimp Avocado Bowl',
    calories: 440,
    image:
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g shrimp',
    'Avocado',
    'Brown rice',
    'Cucumber',
    'Edamame',
    'Soy sauce',
    'Sesame oil'],

    steps: [
    'Sear shrimp in 1 tsp sesame oil 2 minutes per side.',
    'Slice avocado and cucumber.',
    'Layer brown rice in a bowl.',
    'Top with shrimp, avocado, cucumber and edamame.',
    'Drizzle soy sauce and a few sesame seeds.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Baked Chicken Thighs with Greens',
    calories: 400,
    image:
    'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 chicken thighs (skinless)',
    'Lemon',
    'Garlic',
    'Rosemary',
    'Kale',
    'Olive oil'],

    steps: [
    'Marinate chicken in lemon, garlic and rosemary 20 minutes.',
    'Bake at 200°C for 30 minutes until juices run clear.',
    'Massage kale with olive oil and salt.',
    'Quick-sauté kale till just wilted.',
    'Plate chicken over kale with pan juices.']

  }]

},
{
  day: 'Friday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Cottage Cheese & Egg Toast',
    calories: 320,
    image:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 eggs',
    '1/2 cup cottage cheese',
    '2 slices multigrain bread',
    'Tomato',
    'Black pepper'],

    steps: [
    'Boil eggs 8 minutes; cool and slice.',
    'Toast multigrain bread.',
    'Spread cottage cheese generously.',
    'Layer egg slices and tomato.',
    'Finish with black pepper and herbs.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Lemon Herb Chicken Wrap',
    calories: 460,
    image:
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g grilled chicken',
    'Whole wheat wrap',
    'Lettuce',
    'Tomato',
    'Greek yogurt sauce',
    'Lemon'],

    steps: [
    'Marinate chicken in lemon and herbs; grill 5 minutes per side.',
    'Slice into strips.',
    'Warm whole wheat wrap on a tawa.',
    'Spread greek yogurt sauce.',
    'Add chicken, lettuce and tomato; roll tight.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Seared Tuna with Sesame Greens',
    calories: 390,
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g tuna steak',
    'Sesame seeds',
    'Bok choy',
    'Garlic',
    'Soy sauce',
    'Sesame oil'],

    steps: [
    'Press tuna into sesame seeds on all sides.',
    'Sear in a smoking hot pan 1 minute per side.',
    'Rest tuna; slice thin.',
    'Stir-fry bok choy with garlic and a splash of soy.',
    'Plate tuna fanned over the greens.']

  }]

},
{
  day: 'Saturday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Breakfast Burrito (Egg & Beans)',
    calories: 380,
    image:
    'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 eggs',
    '1/2 cup black beans',
    'Whole wheat tortilla',
    'Salsa',
    'Avocado'],

    steps: [
    'Scramble eggs softly in a non-stick pan.',
    'Warm black beans with cumin.',
    'Heat tortilla until pliable.',
    'Layer beans, eggs, salsa and avocado slices.',
    'Fold in sides and roll tight; slice in half.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Mediterranean Salmon Bowl',
    calories: 480,
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g salmon',
    'Quinoa',
    'Cucumber',
    'Olives',
    'Feta',
    'Tzatziki'],

    steps: [
    'Bake seasoned salmon at 200°C for 12 minutes.',
    'Cook quinoa fluffy.',
    'Chop cucumber and halve olives.',
    'Build bowl with quinoa, salmon, vegetables and feta.',
    'Drizzle with creamy tzatziki sauce.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Grilled Lamb Chops with Mint Salad',
    calories: 460,
    image:
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '250g lean lamb chops',
    'Mint',
    'Yogurt',
    'Cucumber',
    'Lemon',
    'Garlic'],

    steps: [
    'Marinate lamb in garlic, lemon and herbs 30 minutes.',
    'Grill on high heat 3 minutes per side for medium.',
    'Rest 5 minutes.',
    'Whisk yogurt with mint and grated cucumber.',
    'Serve chops with the cool mint sauce.']

  }]

},
{
  day: 'Sunday',
  meals: [
  {
    time: '08:00 AM',
    type: 'Breakfast',
    name: 'Poached Eggs on Avocado Toast',
    calories: 360,
    image:
    'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '2 eggs',
    'Avocado',
    '2 slices sourdough',
    'Lemon',
    'Chili flakes'],

    steps: [
    'Bring water to a gentle simmer with a splash of vinegar.',
    'Crack eggs into the swirling water and poach 3 minutes.',
    'Mash avocado with lemon and salt.',
    'Spread on toasted sourdough.',
    'Top each toast with a poached egg and chili flakes.']

  },
  {
    time: '01:00 PM',
    type: 'Lunch',
    name: 'Chicken & Sweet Potato Bowl',
    calories: 470,
    image:
    'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g chicken breast',
    'Sweet potato',
    'Broccoli',
    'Quinoa',
    'Tahini dressing'],

    steps: [
    'Roast cubed sweet potato at 220°C for 25 minutes.',
    'Pan-sear chicken seasoned with paprika.',
    'Steam broccoli 4 minutes.',
    'Layer quinoa, chicken, sweet potato and broccoli in a bowl.',
    'Drizzle generously with tahini dressing.']

  },
  {
    time: '07:30 PM',
    type: 'Dinner',
    name: 'Shrimp Garlic Zoodles',
    calories: 340,
    image:
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    ingredients: [
    '200g shrimp',
    '2 zucchinis (spiralized)',
    'Garlic',
    'Cherry tomatoes',
    'Lemon',
    'Parsley'],

    steps: [
    'Spiralize zucchini into noodles.',
    'Sear shrimp in 1 tsp olive oil with garlic 2 minutes per side.',
    'Add halved tomatoes and toss 1 minute.',
    'Add zoodles and warm through 1 minute.',
    'Finish with lemon juice and parsley.']

  }]

}];


export const MEAL_PLANS: Record<CuisineKey, Record<DietKey, DayPlan[]>> = {
  indian: { veg: indianVeg, nonVeg: indianNonVeg },
  global: { veg: globalVeg, nonVeg: globalNonVeg }
};