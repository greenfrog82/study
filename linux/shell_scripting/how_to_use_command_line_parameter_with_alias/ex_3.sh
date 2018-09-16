#!/bin/bash

perform() {
    echo 'This is first command line parameter :' $1
    echo 'This is second command line parameter :' $2
    echo 'These are all command line parameters :' $@
}

perform $@
