{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE NoImplicitPrelude #-}

module Main where

import Yesod (
    Html,
    RenderRoute (renderRoute),
    Yesod (defaultLayout),
    mkYesod,
    parseRoutes,
    warp,
    whamlet,
 )
import Prelude

data HelloWorld = HelloWorld

mkYesod
    "HelloWorld"
    [parseRoutes|
/ HomeR GET
|]
instance Yesod HelloWorld

getHomeR :: Handler Html
getHomeR = defaultLayout [whamlet|Hello World!|]

main :: IO ()
main = warp 3000 HelloWorld
