# test
```javascript
const validateName = createSelector(
  (state, props) => state.creatives[props.index].name,
  (name) => {
    if (!name) {
      return 'Ad Name must be set'
    }
  },
)

const validateFbPage = createSelector(
  (state, props) => state.creatives[props.index].pageId,
  (pageId) => {
    if (!pageId) {
      return 'Facebook Page must be set'
    }
  },
)

const validateIgAccount = createSelector(
  (state, props) => state.creatives[props.index].instagramAccountId,
  (igAccountId) => {
    if (!igAccountId) {
      return 'Instagram Account must be set'
    }
  },
)

const validateCreative = createSelector(
  [validateName, validateFbPage, validateIgAccount],
  (nameValidation, fbPageValidation, igAccountValidation) => {
    return !(nameValidation || fbPageValidation || igAccountValidation)
  },
)
```
