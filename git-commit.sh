ls -ltr

git status

git add .

foo="changes-"$(date +%Y-%m-%d-%H-%M-%S)

git commit -m $foo

git push origin main