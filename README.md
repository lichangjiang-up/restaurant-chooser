# Welcome Restaurant-Chooser App

## Clone & Run
```shell
git clone https://github.com/lichangjiang-up/restaurant-chooser.git
cd restaurant-chooser
npm install
npm run android
```

## Navigation 
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
### app/(tabs)/_layout.tsx
**Bottom navigation bar**
![b_bar.png](readme/b_bar.png)

### app/(tabs)/(decision)/index.tsx
**Decision Index Page**

_On this page, clicking on the pictures or text will lead you to the page of app/(tabs)/(decision)/who.tsx._

![decision-idx.png](readme/decision-idx.png)

### app/(tabs)/(decision)/who.tsx

**Who's Going Page**

_On this page, you can select the people who will have meals._

![who.png](readme/who.png)

### app/(tabs)/(decision)/pre_filters.tsx

**Restaurant Filter Page**

* You can filter the restaurants that meet the conditions on this page.
* Click the "Next" button, and you will enter the page of `app/(tabs)/(decision)/choice.tsx`.


![pre_filters.png](readme/pre_filters.png)

### app/(tabs)/(decision)/choice.tsx

**Choice Screen**

![choice.png](readme/choice.png)


**Clicking the button will randomly pop up information about a restaurant:**

![restaurant-pop.png](readme/restaurant-pop.png)

**If you click "Veto", it will display the "Vetoed People" list:**

![veto-pop.png](readme/veto-people.png)

**After selecting and clicking the "Save" button, you will see that the original "People" list now shows those who have chosen "Veto".**

![veto-yes.png](readme/veto-yes.png)

**In order to obtain a restaurant that satisfies everyone, you continued to click the 'Randomly Choice' button:**

![restaurant-pop-2.png](readme/restaurant-pop-2.png)

**All of you are quite satisfied with this restaurant. You clicked the 'Accept' button and then entered the `app/(tabs)/(decision)/enjoy.tsx` page.**


### app/(tabs)/(decision)/enjoy.tsx

**Enjoy Page**

![enjoy.png](readme/enjoy.png)


