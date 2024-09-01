# import json
# import csv
# from typing import List, Dict

# def load_json_file(file_path: str) -> List[Dict]:
#     """Load data from a JSON file."""
#     with open(file_path, 'r') as file:
#         return json.load(file)

# def extract_emails(users: List[Dict], parents: List[Dict], children: List[Dict]) -> List[Dict[str, str]]:
#     # Create a mapping of user_id to email for quick lookup
#     email_map = {user['_id']['$oid']: user['email'] for user in users}
#     results = []

#     # Extract parent emails and their children's emails
#     for parent in parents:
#         parent_email = email_map.get(parent['user_id'], '')
#         if parent_email:
#             children_emails = [email_map.get(child_id, '') for child_id in parent.get('children', [])]
#             parent_data = {
#                 'parent_email': parent_email,
#                 'children_emails': ', '.join(children_emails)
#             }
#             results.append(parent_data)

#     return results

# def save_to_csv(data: List[Dict[str, str]], file_path: str):
#     """Save data to a CSV file."""
#     with open(file_path, 'w', newline='') as file:
#         fieldnames = ['parent_email', 'children_emails']
#         writer = csv.DictWriter(file, fieldnames=fieldnames)
#         writer.writeheader()
#         writer.writerows(data)

# # File paths (Update these paths to match the location of your files)
# users_file_path = 'E_Learning.user.json'
# parents_file_path = 'E_Learning.parent.json'
# children_file_path = 'E_Learning.child.json'
# output_file_path = 'parent_children_emails.csv'  # Output file path

# # Load data from JSON files
# users = load_json_file(users_file_path)
# parents = load_json_file(parents_file_path)
# children = load_json_file(children_file_path)

# # Extract emails
# emails = extract_emails(users, parents, children)

# # Save results to a CSV file
# save_to_csv(emails, output_file_path)
