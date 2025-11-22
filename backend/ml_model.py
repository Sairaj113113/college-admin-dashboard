import joblib

class SimpleRiskModel:
    def __init__(self):
        pass

    def predict(self, X):
        results = []
        for attendance, marks in X:
            if attendance < 75 or marks < 50:
                results.append(1)  # At Risk
            else:
                results.append(0)  # Safe
        return results

# Train (in this simple case, no training needed)
model = SimpleRiskModel()

# Save model
joblib.dump(model, "student_risk_model.pkl")
print("✅ Model saved as student_risk_model.pkl")

# Quick test
test = [[60, 50], [85, 70]]
print("Predictions:", model.predict(test))
