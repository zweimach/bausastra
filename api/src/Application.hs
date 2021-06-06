{-# LANGUAGE NoImplicitPrelude #-}

module Application (appMain) where

import Prelude (IO, putStrLn, return)

appMain :: IO ()
appMain = do
    putStrLn "Hello"
    return ()
