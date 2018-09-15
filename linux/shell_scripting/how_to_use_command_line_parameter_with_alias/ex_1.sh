#!/bin/bash

perform() {
    echo 'Shell Script Name : ' $0
    echo 'This is first command line parameter : ' $1
    echo 'This is second command line parameter : ' $2
}

perform $0 $1 $2
