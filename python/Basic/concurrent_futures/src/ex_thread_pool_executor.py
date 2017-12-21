from concurrent.futures import ThreadPoolExecutor
from time import sleep


def return_after_5_secs(message):
    sleep(5)
    return message

futures = []

pool = ThreadPoolExecutor(3)

for idx in range(0, 3):
    futures.append(pool.submit(return_after_5_secs, (idx)))

sleep(5)

for future in futures:
    print future.result()
