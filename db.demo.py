import pyorient


client = pyorient.OrientDB("localhost", 2424)
session_id = client.connect("root", "hello")

try:
  client.db_open("test2", "root", "hello")

except:
  print("Non-default Credentials found on: %s" % i)


################
# command
################
'''
sql = 'SELECT from FRIEND'
res = client.command(sql)

print res


'''


sql1 = 'SELECT from Person'
sql2 = 'SELECT from FRIEND'
batch_cmds = ['begin']
batch_cmds.append(sql1)
batch_cmds.append(sql2)
# Add Batch Commit
batch_cmds.append('commit retry 100;')

# Join with Semicolons
cmd = ';'.join(batch_cmds)
results = client.batch(cmd)
print results

'''

# List Databases
database_list = client.db_list().__getattr__('databases')

# Check for Default Login
for i in database_list:
   try:
      client.db_open(i, "admin", "admin")
      print("Default Credentials found on: %s" % i)
      client.db_close()
   except:
      print("Non-default Credentials found on: %s" % i)

'''


client.db_close()
