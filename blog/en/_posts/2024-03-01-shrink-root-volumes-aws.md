---
layout: post
title: "shrink root volumes in AWS"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

## Volumes

* /dev/**nvme1n1** → Old volume → **/old**
* /dev/**nvme2n1** → New volume → **/new**
* /dev/**nvme3n1** → Backup Old volume (only applicable for XFS root volumes) → **/old-backup**

## General instructions

1. Create a snapshot of the root volume
2. Stop the target instance
3. Create a new volume with the desired size, ensure iops and speed are equal to the old volume
4. Create a tmp ec2 instance, this is what would be used to copy data between the old / new volumes
5. Detach the root volume from the old instance and attach it to the tmp one
6. Attach the new volume to the tmp instance and ssh into it
7. `mkdir -p /old /new`
8. `dd bs=16M if=/dev/nvme1n1 of=/dev/nvme2n1 count=100` #copy bootloader from old to the new volume
9. `fdisk /dev/nvme2n1` #format new volume
```
press 'p' take note on the start section, eg: 2048
delete the current partition with 'd'
create a new partition 'n' and use the previous start section
press 'a' to make the partition bootable
press 'w' to save changes
```
10. `fdisk -l` #review than old and new volumes looks similar

**########## ext2/3/4 ##########**

11. `e2fsck -f /dev/nvme1n1p1` #check for errors in old volume
12. `resize2fs -M -p /dev/nvme1n1p1` #move the data to the beginning of the partition

In the previous command’s output, the last line tells you the number of blocks.  Each block is sized 4K but when we clone the partition, we are going to do it in 16 MB blocks.  So, in order to compute the number of 16 MB, blocks, multiply the number in the last line by 4 / (16 * 1024).

Round this number UP (not down) to the nearest integer. Example: 1252939 (number in last line) * 4 / (16 * 1024) = 305.893310546875 ... But round this UP to 306 or even 310 (it doesn’t matter as long as you don’t go below).

`dd bs=16M if=/dev/nvme1n1p1 of=/dev/nvme2n1p1 count=310` #copy data from old to new volume

13. `resize2fs -p /dev/nvme2n1p1` #new volume, expand fs
14. `e2fsck -f /dev/nvme2n1p1` #fix possible errors in the new volume

**########## xfs ##########**

11. Create an additional volume same size as old volume and attached to the tmp instance. Will be use it to host a backup of the original fs, this is a workaround to xfs lack of shrinking capacity
12. `mkfs.xfs /dev/nvme2n1 /dev/nvme3n1` #format the new and the additional volume
13. `mount /dev/nvme1n1 /old; mount /dev/nvme2n1 /new`
14. `mkdir /old-backup; mount /dev/nvme3n1 /old-backup`
16. `xfsdump -L data -f /old-backup/old.xfsdump /old`
17. `xfsrestore -f /old-backup/old.xfsdump /new/`
18. `blkid /dev/nvme1n1p1` #get old uuid
19. `xfs_admin -U <UUID from step above> /dev/nvme2n1p1` #apply old uuid to new volume
20. `xfs_admin -L / /dev/nvme2n1p1`

## Final step

Dettach the new volume, attach it to the target instance as **/dev/sda1** and start the instance

References:

* [https://medium.com/@ztobscieng/shrink-an-amazon-aws-ebs-root-volume-2020-update-8db834265c3e](https://medium.com/@ztobscieng/shrink-an-amazon-aws-ebs-root-volume-2020-update-8db834265c3e) **ext2/3/4**
* [https://medium.com/@benedikt.langens/how-to-shrink-an-ebs-root-volume-xfs-on-amazon-linux-2-2023-a7705c16e839](https://medium.com/@benedikt.langens/how-to-shrink-an-ebs-root-volume-xfs-on-amazon-linux-2-2023-a7705c16e839) **xfs**
