watchmedo shell-command \
    --patterns='*.py;*.txt' \
    --recursive \
    --command='python "app.py"' \
    .
