# s3-image-uploader
 
## client-side: 

Create a ```.env.local``` file in the ```client``` directory with the below values inside it
NEXT_PUBLIC_HOSTNAME=localhost
NEXT_PUBLIC_PORT=5005
NEXT_PUBLIC_HOST=http://$HOSTNAME:$PORT

PORT=5005
NEXT_PUBLIC_ACCESS_KEY_ID=your-acces-key-id
NEXT_PUBLIC_SECRET_ACCESS_KEY=your-secret-acces-key
NEXT_PUBLIC_BUCKET_NAME=samp-bucket-test2


```yarn install```
```yarn dev```


## server-side:

Create a ```.env``` file in the ```server``` directory with the below values inside it
PORT=5005
ACCESS_KEY_ID=your-acces-key-id
SECRET_ACCESS_KEY=your-secret-acces-key
BUCKET_NAME =samp-bucket-test2

```yarn install```
```yarn dev```
