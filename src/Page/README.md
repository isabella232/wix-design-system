# <Page/>

Page component is a wrapper component which allows you to use the sticky header component.
<br/>
The PageHeader component is the header implementation that will be changed when scrolling down inside the page.

## Properties
| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| backgroundImageUrl | string | null | false | Background image url of the header beackground |
| maxWidth | number | null | false | Sets the max width of the header and the content |
| sidePadding | number | null | false | Sets padding of the sides of the page |
| gradientClassName | string | null | false | Header background color class name, allows to add a gradient to the header |
| gradientCoverTail | bool | true | false | Should gradient cover Page.Tail |

## Children
| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| Page.Header | Page.Header | null | true | The PageHeader object which defines the components within the Header |
| Page.Tail | Page.Tail | null | false | A placeholder for a component which sticks to the bottom of the header. Page.Tail.children receive `minimized` flag |
| Page.Content | Page.Content | null | true | A placeholder for the page scrollable body, support `fullScreen` property which spans the content on the available area |

## Gradient
You can generate Gradient CSS in here: <a href="https://www.cssmatic.com/gradient-generator">Gradient Generator</a>
