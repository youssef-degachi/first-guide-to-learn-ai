# Deliberately buggy training example. See README.md for the specification.

def deduplicate_contacts(contacts):
    seen = set()
    result = []
    for contact in contacts:
        key = contact.get("email", "").lower()
        if key not in seen:
            seen.add(key)
            result.append(contact)
    return result
