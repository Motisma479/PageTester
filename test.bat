@echo off
chcp 65001
cls
echo ┏━━━━━━━━━━━━━━━━━━━━┓
echo ┃    Git Commiter    ┃
echo ┗━━━━━━━━━━━━━━━━━━━━┛
git pull
git add .
echo Name your commit :
set /p input= 
git commit -m "%input%"
pause