import React, { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
} from "@mui/material"
import { Outlet } from "react-router-dom"
import MainMenu from "../components/MainMenu/MainMenu"
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles"
import { useAppSelector } from "../store/hooks"
import { QueryStatus } from "@reduxjs/toolkit/dist/query"
import { enUS, ruRU, Localization } from "@mui/material/locale"
import { useTranslation } from "react-i18next"
import { selectLocale } from "../store/slices/local-slice"

function Root() {
  const theme = useTheme()
  const locale = useSelector(selectLocale)

  const locales: { [key: string]: Localization } = {
    en: enUS,
    ru: ruRU,
  }

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale.substring(0, 2))
  }, [locale])

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale.substring(0, 2)]),
    [locale, theme]
  )

  const isLoading = useAppSelector((state) => {
    return Object.values(state.tester.queries).some((query) => {
      return query && query.status === QueryStatus.pending
    })
  })

  return (
    <ThemeProvider theme={themeWithLocale}>
      <CssBaseline />
      <MainMenu />
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default Root
