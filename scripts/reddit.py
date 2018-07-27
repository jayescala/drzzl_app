import praw
import json

reddit = praw.Reddit(client_id="NM8GwNknsmdz6A", client_secret="2VZ5i9XZ0RgI3YtaFlfE_WjASOw", user_agent="user_agent")

subreddit = reddit.subreddit("raining")

list = []
for idx, submission in enumerate(subreddit.new(limit=8), start=0):
    list.append({
        "index": idx,
        "title": submission.title,
        "author": submission.author.name,
        "thumbnail": submission.thumbnail,
        "url": submission.url
    })

data = {
    "list": list
}

print json.dumps(data)
