# Welcome Restaurant-Chooser App

https://github.com/user-attachments/assets/a3343b3d-fe94-4dc7-945d-8885320fea00 

https://github.com/user-attachments/assets/e8447aca-f4f2-44cd-97a5-952300daa38a


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

## [app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx)
**Bottom navigation bar**

<img src="readme/b_bar.png" width="350px">

## [(decision)](app/(tabs)/(decision)/_layout.tsx)
### [app/(tabs)/(decision)/index.tsx](app/(tabs)/(decision)/index.tsx)
**Decision Index Page**

_On this page, clicking on the pictures or text will lead you to the page of [Who's Going](#apptabsdecisionwhotsx)._

<img src="readme/decision-idx.png" width="350px">


### [app/(tabs)/(decision)/who.tsx](app/(tabs)/(decision)/who.tsx)

**Who's Going Page**

_On this page, you can select the people who will have meals._

<img src="readme/who.png" width="350px">


### [app/(tabs)/(decision)/pre_filters.tsx](app/(tabs)/(decision)/pre_filters.tsx)

**Restaurant Filter Page**

* You can filter the restaurants that meet the conditions on this page.
* Click the "Next" button, and you will enter the page of [Choice](#apptabsdecisionchoicetsx).

<img src="readme/pre_filters.png" width="350px">


### [app/(tabs)/(decision)/choice.tsx](app/(tabs)/(decision)/choice.tsx)

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


**All of you are quite satisfied with this restaurant. You clicked the 'Accept' button and then entered the [Enjoy](#apptabsdecisionenjoytsx) page.**


### [app/(tabs)/(decision)/enjoy.tsx](app/(tabs)/(decision)/enjoy.tsx)

**Enjoy Page**

<img src="readme/enjoy.png" width="350px">


## [(people)](app/(tabs)/(people)/_layout.tsx)

### [app/(tabs)/(people)/index.tsx](app/(tabs)/(people)/index.tsx)

**People Index Page**

* You can click the "Add" button to add a jump to the [Person Upsert](#apptabspeoplepersontsx) page and add a Person.
* You can click the Delete button to remove a Person. If someone is selected by Who's Going Page, they **`cannot`** be **deleted**.
* You can click on a Person Item to jump to [Person Upsert](#apptabspeoplepersontsx) page for update.

<img src="readme/people.png" width="300px"> <img src="readme/decision-2.png" width="300px">

### [app/(tabs)/(people)/person.tsx](app/(tabs)/(people)/person.tsx)

**Person Upsert Page**

After filling in the data and clicking the "Save" button, the newly added or modified Person will appear at the top of the [People](#apptabspeopleindextsx) page.

<img src="readme/person.png" width="350px"> 

## [(restaurants)](app/(tabs)/(restaurants)/_layout.tsx)

### [app/(tabs)/(restaurants)/index.tsx](app/(tabs)/(restaurants)/index.tsx)

**Restaurants Index Page**

* You can click the "Add" button to add a jump to the [Restaurants Upsert](#apptabsrestaurantsrestauranttsx) page and add a Restaurants.
* You can click the Delete button to remove a Restaurants.
* You can click on a Restaurants Item to jump to [Restaurants Upsert](#apptabsrestaurantsrestauranttsx) page for update.

<img src="readme/restaurants.png" width="350px">


### [app/(tabs)/(restaurants)/restaurant.tsx](app/(tabs)/(restaurants)/restaurant.tsx)

**Restaurants Upsert Page**

After filling in the data and clicking the "Save" button, the newly added or modified Restaurant will appear at the top of the [Restaurants](#apptabsrestaurantsindextsx) page.

<img src="readme/restaurant.png" width="350px">

# Components

```text
├── VFull.tsx
├── choice
│   ├── ChoiceModal.tsx
│   ├── ChoiceModalRestaurant.tsx
│   ├── ChoiceModalVeto.tsx
│   └── choice_stores.ts
└── ui
    ├── HapticPressable.tsx
    ├── IconImage.tsx
    ├── MyBtn.tsx
    ├── MyCheckbox.tsx
    ├── MyModal.tsx
    ├── MyPiker.tsx
    ├── MyTextInput.tsx
    ├── TabBarBackground.ios.tsx
    └── TabBarBackground.tsx
```

# State & Storage

**Use MMKV as the storage engine and use Zustand to manage the state.**

```text
├── state.ts
└── storage.ts
```
 
