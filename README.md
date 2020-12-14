# Todo-app-in-react-native(sync todos using google)
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/8ipuAYNNg20/0.jpg)](https://www.youtube.com/watch?v=8ipuAYNNg20)


This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

# Releases

* [Android](https://play.google.com/store/apps/details?id=de.mokkapps.parentssoundboard)
* [iOS](https://itunes.apple.com/us/app/parents-soundboard/id1434425575?mt=8)

# Run locally on your development machine

```

$ yarn install
$ yarn start

$ yarn android
or
$ yarn ios
```

# Run iOS or Android release builds locally

```
$ yarn android-release
or
$ yarn ios-release
```

# Build releases for App stores

## iOS

- In Xcode open \_parentssoundboard.xcworkspace\_\_ from ./ios folder
- Select `Product > Archive` from menu bar

## Android

- Place your keystore in ./android/app folder
- Enter your keystore password in ./android/gradle.properties
- Run `cd android && ./gradlew assembleRelease`
- If you still have issues, checkout the [official docs](https://facebook.github.io/react-native/docs/signed-apk-android)
