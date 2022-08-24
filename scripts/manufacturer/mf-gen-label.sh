#!/bin/bash
set -euo pipefail

#
# Arguments:
# ${1} - Device private key (44 chars)
# ${2} - Device model name (up to 30 chars)
# ${3} - Device mac address (00:10:20:30:40:50)
# ${4} - Device pin code (hjGJgjAS)
# ${5} - Output image path name (/opt/opcb-release/ui-static/opcb-label.png)

dev_key_priv=${1}
dev_model=${2}
dev_mac=${3}
dev_pin=${4}
path_img=${5}
path_qr="/tmp/opcb-qr.png"
#dev_key1=${dev_key_priv:0:22}
#dev_key2=${dev_key_priv:22:22}
mac4=${dev_mac:9:2}
mac5=${dev_mac:12:2}
mac6=${dev_mac:15:2}

# Generate QR code
echo "Generate device QR code..."
qrencode -s 9 -o ${path_qr} "https://с.overvis.com/pk/?pk=${dev_key_priv}"

# Create canvas
echo "Generate device image..."
#convert -size 945x591 canvas:none -stroke white -strokewidth 2 -fill white -draw 'rectangle 0, 0, 945, 591' ${path_img}
conv_param=(-size 945x650 canvas:none -stroke white -strokewidth 2 -fill white -draw "rectangle 0, 0, 945, 650")
# Model 32 characters max
conv_param+=(-fill black -stroke black -strokewidth 1 -font DejaVuSans-Bold.ttf -pointsize 36 -draw "text 40,80 \"Model:\"" -font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 185,80 \"${dev_model}\"")
# dev_Key
conv_param+=(-fill black -stroke black -strokewidth 1 -font DejaVuSans-Bold.ttf -pointsize 36 -draw "text 40,130 \"Private key:\"" -font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 40,180 \"${dev_key_priv}\"")
# MAC
conv_param+=(-font DejaVuSans-Bold.ttf -pointsize 36 -draw "text 445,260 \"MAC:\"" -font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 560,260 \"${dev_mac}\"")
# PIN
conv_param+=(-font DejaVuSans-Bold.ttf -pointsize 58 -draw "text 440,350 \"PIN:\"" -font DejaVuSansMono-Bold.ttf -pointsize 52 -draw "text 590,350 \"${dev_pin}\"")
# Wi-Fi
conv_param+=(-font DejaVuSans-Bold.ttf -pointsize 36 -draw "text 445,420 \"Wi-Fi:\"" -font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 570,420 \"OPCB_${mac4}${mac5}${mac6}\"")
conv_param+=(-font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 570,470 \"(no password)\"")
conv_param+=(-font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 570,520 \"setup.overvis.com\"")
conv_param+=(-font DejaVuSansMono-Bold.ttf -pointsize 32 -draw "text 40,590 \"https://c.overvis.com/${dev_pin}\"")
# QR
conv_param+=(-gravity center -draw "image over -280,52 0,0 \"${path_qr}\"")
convert "${conv_param[@]}" "${path_img}"

# Remove temporary qr code files
#echo "Remove temporary files..."
#rm -f ${path_qr}

exit 0