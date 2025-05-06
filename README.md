# Welcome Restaurant-Chooser App

# Clone & Run
```shell
git clone https://github.com/lichangjiang-up/restaurant-chooser.git
cd restaurant-chooser
npm install
npm run android
```

# Navigation 
```text
├── (tabs)
│   ├── (decision)
│   │   ├── _layout.tsx
│   │   ├── choice.tsx
│   │   ├── enjoy.tsx
│   │   ├── index.tsx
│   │   ├── pre_filters.tsx
│   │   └── who.tsx
│   ├── (people)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── person.tsx
│   ├── (restaurants)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── restaurant.tsx
│   └── _layout.tsx
├── +not-found.tsx
└── _layout.tsx
```

## app/(tabs)/_layout.tsx
**Bottom navigation bar**

<img src="readme/b_bar.png" width="350px">
<br/>

## (decision)
### app/(tabs)/(decision)/index.tsx
**Decision Index Page**

_On this page, clicking on the pictures or text will lead you to the page of app/(tabs)/(decision)/who.tsx._

<img src="readme/decision-idx.png" width="350px">
<br/>

### app/(tabs)/(decision)/who.tsx

**Who's Going Page**

_On this page, you can select the people who will have meals._

<img src="readme/who.png" width="350px">
<br/>


### app/(tabs)/(decision)/pre_filters.tsx

**Restaurant Filter Page**

* You can filter the restaurants that meet the conditions on this page.
* Click the "Next" button, and you will enter the page of `app/(tabs)/(decision)/choice.tsx`.

<img src="readme/pre_filters.png" width="350px">
<br/>

### app/(tabs)/(decision)/choice.tsx

**Choice Screen**

<img src="readme/choice.png" width="350px">


**Clicking the button will randomly pop up information about a restaurant:**

<img src="readme/restaurant-pop.png" width="350px">


**If you click "Veto", it will display the "Vetoed People" list:**

<img src="readme/veto-people.png" width="350px">


**After selecting and clicking the "Save" button, you will see that the original "People" list now shows those who have chosen "Veto".**

<img src="readme/veto-yes.png" width="350px">


**In order to obtain a restaurant that satisfies everyone, you continued to click the 'Randomly Choice' button:**

<img src="readme/restaurant-pop-2.png" width="350px">


**All of you are quite satisfied with this restaurant. You clicked the 'Accept' button and then entered the `app/(tabs)/(decision)/enjoy.tsx` page.**

<br/>

### app/(tabs)/(decision)/enjoy.tsx

**Enjoy Page**

<img src="readme/enjoy.png" width="350px">

<br/>
<br/>

## (people) 


