# Synchronizing Kosh with GIT Remote Repositories

When you make changes to any file within a Kosh data module (such as .kosh files, XML files, or JSON config files), Kosh automatically updates the corresponding index by default. If you want to synchronize your local Kosh instance with data from a GIT repository, here are two alternatives:

## Option 1: Kosh Sync

You can use [Kosh Sync](https://github.com/cceh/kosh_sync), a Docker container, to synchronize local datasets with their respective cloud repositories.


Setup: 

1. Clone the Kosh Sync repository:

```bash
$ git clone https://github.com/cceh/kosh_sync
``` 
2. Modify the  `docker-compose.sync.yml` file according to your requirements:


```dockerfile
version: '2.3'
services:
 sync:
    build: ../kosh_sync
    networks: ['network']
    volumes: ['ABS_PATH_TO_LOCAL_GIT_REPO:/var/lib/kosh']
    depends_on:
      kosh:
        condition: service_healthy
    environment:
      KOSH_SYNC_BRANCH: master
      KOSH_SYNC_ORIGIN: URL_REPO
      KOSH_SYNC_REPOSE: 1h
      
 ```
 
In the `docker-compose.sync.yml` file, you can customize the `KOSH_SYNC_REPOSE` variable to set the time interval for calling the external GIT repository. The example above sets it to one hour (1h), but you can use values such as (s)econds, (m)inutes, (h)ours, or (d)ays.

Deploy Kosh Sync together with Kosh:

 ```bash
$ docker-compose -f docker-compose.yml -f docker-compose.local.yml -f [PATH_TO_KOSH_SYNC]/docker-compose.sync.yml up -d
 ```


##  Option 2: Cron Job

For Unix-like systems, you can create a cron job to automatically check for updates.

1. Open the crontab file for editing:

 ```bash
$ crontab -e
 ```

2. Add the following line to the crontab file to check for updates daily at 23:00 (11:00 PM):


```
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command
55 23 * * * cd ABS_PATH_TO_LOCAL_GIT_REPO && git pull
```

Replace `ABS_PATH_TO_LOCAL_GIT_REPO` with the absolute path to your local GIT repository.

Choose the option that best fits your needs and workflow to keep your Kosh instance synchronized with the GIT repository.