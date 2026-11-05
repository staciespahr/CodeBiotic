/*
 * Errors
 * Aria navigation
 * Submit button
 * Descriptive items attached
 * Info in multiple spots
 */

 <template>
    <h1>Application</h1>
    <div class="wcag-issues-callout">
        <p class="left-aligned">This page includes the following WCAG criteria mistakes:</p>
        <ul class="left-aligned">
            <li>1.1.1 Non-text Content</li>
            <li>1.3.1 Info and Relationships</li>
            <li>3.2.6 Consistent Help</li>
            <li>TODO 3.3.1 Error Identification</li>
            <li>TODO 4.1.3 Status Messages</li>
            <li>TODO 3.3.4 Error Prevention</li>
            <li>TODO 3.3.3 Error Suggestion</li>
            <li>2.5.8 Target Size</li>
        </ul>
    </div>

    <h3>Basic Information</h3>
    <div class="left-aligned application-form">
        <div class="form-row">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" />
        </div>

        <div class="form-row">
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" />
        </div>

        <div class="form-row">
            <label>DOB:</label>
            <input type="text"/>
        </div>

        <div class="form-row">
            <label for="email">Email:</label>
            <div>fake@gmail.com</div>
        </div>
    </div>

    <h3>Favorite Things</h3>
    <div class="left-aligned application-form">
        <div class="form-row checkbox-group-row">
            <div class="checkbox-group-label">What is your favorite color?</div>
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" name="favoriteColor" value="red" />
                    Red
                </label>

                <label>
                    <input type="checkbox" name="favoriteColor" value="blue" />
                    Blue
                </label>

                <label>
                    <input type="checkbox" name="favoriteColor" value="green" />
                    Green
                </label>

                <label>
                    <input type="checkbox" name="favoriteColor" value="other" id="favoriteColorOther" />
                    Other
                </label>

                <div class="other-input">
                    <label for="favoriteColorOtherText">Other:</label>
                    <input type="text" id="favoriteColorOtherText" />
                </div>
            </div>
        </div>

        <div class="form-row">
            <label for="season">What is your favorite season?</label>
            <select id="season">
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
            </select>
        </div>

        <p>
            A favorite food is a dish that someone enjoys eating the most.
            It can be a specific type of cuisine, a particular recipe, or
            even a comfort food that brings back fond memories. Everyone has
            their own unique favorite food, and it often reflects their personal
            tastes and cultural background. If you have any questions please contact
            us at contact@gmail.com or 555-555-5555.
        </p>

        <div class="form-row">
            <label for="favoriteFood">What is your favorite food?</label>
            <input type="text" id="favoriteFood" />
        </div>

        <button disabled type="submit">Submit</button>
    </div>

</template>