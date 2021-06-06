module Main exposing (Msg(..), main, update, view)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


main : Program () Int Msg
main =
    Browser.sandbox { init = 0, update = update, view = view }


type Msg
    = Increment
    | Decrement


update : Msg -> number -> number
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1


view : Int -> Html Msg
view model =
    div []
        [ button
            [ class "border-2 bg-green-400 text-lg p-4"
            , onClick Decrement
            ]
            [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button
            [ class "border-2 bg-green-400 text-lg p-4"
            , onClick Increment
            ]
            [ text "+" ]
        ]
