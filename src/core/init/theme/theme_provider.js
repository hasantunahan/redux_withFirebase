import React from 'react'

const ThemeProvider = (my) => {
  const [theme, setTheme] = React.useState({})
  React.useEffect(() => {
   async function getTheme() {
      setTheme(my)
    }
    getTheme()
  },[my])

  return theme;
}
export default ThemeProvider;