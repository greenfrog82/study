#!/bin/bash

perform() {
    echo 'This is command line parameters :' $@
}

perform $@
